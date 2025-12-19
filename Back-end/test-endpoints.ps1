# API Endpoint Testing Script
# Tests all endpoints and displays responses

$baseUrl = "http://localhost:5000"
$testResults = @()

function Test-Endpoint {
    param(
        [string]$Method,
        [string]$Endpoint,
        [string]$Description,
        [hashtable]$Body = $null,
        [hashtable]$Headers = @{"Content-Type" = "application/json"}
    )
    
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "$Method $Endpoint" -ForegroundColor Yellow
    Write-Host "$Description" -ForegroundColor Gray
    Write-Host "========================================" -ForegroundColor Cyan
    
    try {
        $params = @{
            Uri = "$baseUrl$Endpoint"
            Method = $Method
            Headers = $Headers
            ErrorAction = "Stop"
        }
        
        if ($Body) {
            $params.Body = ($Body | ConvertTo-Json -Depth 10)
        }
        
        $response = Invoke-RestMethod @params
        
        Write-Host "✓ SUCCESS" -ForegroundColor Green
        Write-Host "Response:" -ForegroundColor White
        $response | ConvertTo-Json -Depth 5 | Write-Host
        
        $script:testResults += [PSCustomObject]@{
            Endpoint = "$Method $Endpoint"
            Status = "PASS"
            Description = $Description
        }
        
        return $response
    }
    catch {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "✗ FAILED (Status: $statusCode)" -ForegroundColor Red
        
        if ($_.ErrorDetails.Message) {
            Write-Host "Error Response:" -ForegroundColor Red
            $_.ErrorDetails.Message | Write-Host
        }
        
        $script:testResults += [PSCustomObject]@{
            Endpoint = "$Method $Endpoint"
            Status = "FAIL"
            Description = "$Description (Status: $statusCode)"
        }
        
        return $null
    }
}

Write-Host "=" -repeat 80 -ForegroundColor Magenta
Write-Host "API ENDPOINT TESTING - DevFest Challenge Batna 2025" -ForegroundColor Magenta
Write-Host "=" -repeat 80 -ForegroundColor Magenta

# Test 1: Root endpoint
Test-Endpoint -Method "GET" -Endpoint "/" -Description "Root API info"

# Test 2: Student Registration
Write-Host "`n`n### AUTHENTICATION TESTS ###`n" -ForegroundColor Magenta
$studentData = @{
    name = "Test Student"
    email = "teststudent$(Get-Random)@example.com"
    password = "password123"
    year = 2
    department = "Computer Science"
}
$registerResponse = Test-Endpoint -Method "POST" -Endpoint "/api/auth/register" -Description "Register new student" -Body $studentData
$studentToken = if ($registerResponse) { $registerResponse.token } else { $null }

# Test 3: Login with seeded staff account
$loginData = @{
    email = "sami.kaddour@admin.dz"
    password = "admin123"
}
$loginResponse = Test-Endpoint -Method "POST" -Endpoint "/api/auth/login" -Description "Login as staff" -Body $loginData
$staffToken = if ($loginResponse) { $loginResponse.token } else { $null }

# Test 4: Login as teacher
$teacherLoginData = @{
    email = "amina.belhadj@university.dz"
    password = "teacher123"
}
$teacherLoginResponse = Test-Endpoint -Method "POST" -Endpoint "/api/auth/login" -Description "Login as teacher" -Body $teacherLoginData
$teacherToken = if ($teacherLoginResponse) { $teacherLoginResponse.token } else { $null }

# Test 5: Login as student
$studentLoginData = @{
    email = "ahmed.benali@example.com"
    password = "student123"
}
$studentLoginResponse = Test-Endpoint -Method "POST" -Endpoint "/api/auth/login" -Description "Login as existing student" -Body $studentLoginData
$existingStudentToken = if ($studentLoginResponse) { $studentLoginResponse.token } else { $null }

# Test 6: Get current user profile
if ($studentToken) {
    $authHeaders = @{
        "Content-Type" = "application/json"
        "Authorization" = "Bearer $studentToken"
    }
    Test-Endpoint -Method "GET" -Endpoint "/api/auth/me" -Description "Get authenticated user profile" -Headers $authHeaders
}

# Test 7: Register teacher (staff only)
if ($staffToken) {
    $teacherData = @{
        name = "Test Teacher"
        email = "testteacher$(Get-Random)@university.dz"
        password = "teacher123"
        department = "Mathematics"
        title = "Associate Professor"
    }
    $authHeaders = @{
        "Content-Type" = "application/json"
        "Authorization" = "Bearer $staffToken"
    }
    Test-Endpoint -Method "POST" -Endpoint "/api/auth/register/teacher" -Description "Register teacher (staff only)" -Body $teacherData -Headers $authHeaders
}

# STUDENT ENDPOINTS
Write-Host "`n`n### STUDENT ENDPOINTS ###`n" -ForegroundColor Magenta

# Test 8: Get all students (teacher/staff only)
if ($teacherToken) {
    $authHeaders = @{
        "Content-Type" = "application/json"
        "Authorization" = "Bearer $teacherToken"
    }
    $studentsResponse = Test-Endpoint -Method "GET" -Endpoint "/api/students" -Description "Get all students (teacher)" -Headers $authHeaders
    $studentId = if ($studentsResponse -and $studentsResponse.data -and $studentsResponse.data.Count -gt 0) { 
        $studentsResponse.data[0]._id 
    } else { 
        $null 
    }
}

# Test 9: Get single student
if ($teacherToken -and $studentId) {
    $authHeaders = @{
        "Content-Type" = "application/json"
        "Authorization" = "Bearer $teacherToken"
    }
    Test-Endpoint -Method "GET" -Endpoint "/api/students/$studentId" -Description "Get student by ID" -Headers $authHeaders
}

# Test 10: Create student (teacher/staff only)
if ($teacherToken) {
    $newStudentData = @{
        name = "Created Student"
        email = "created$(Get-Random)@example.com"
        year = 1
        department = "Physics"
        averageGrade = 15.5
    }
    $authHeaders = @{
        "Content-Type" = "application/json"
        "Authorization" = "Bearer $teacherToken"
    }
    Test-Endpoint -Method "POST" -Endpoint "/api/students" -Description "Create student (teacher)" -Body $newStudentData -Headers $authHeaders
}

# Test 11: Update student
if ($teacherToken -and $studentId) {
    $updateData = @{
        averageGrade = 18.5
    }
    $authHeaders = @{
        "Content-Type" = "application/json"
        "Authorization" = "Bearer $teacherToken"
    }
    Test-Endpoint -Method "PUT" -Endpoint "/api/students/$studentId" -Description "Update student" -Body $updateData -Headers $authHeaders
}

# COURSE ENDPOINTS
Write-Host "`n`n### COURSE ENDPOINTS ###`n" -ForegroundColor Magenta

# Test 12: Get all courses (public)
$coursesResponse = Test-Endpoint -Method "GET" -Endpoint "/api/courses" -Description "Get all courses (public)"
$courseId = if ($coursesResponse -and $coursesResponse.data -and $coursesResponse.data.Count -gt 0) { 
    $coursesResponse.data[0]._id 
} else { 
    $null 
}

# Test 13: Get single course (public)
if ($courseId) {
    Test-Endpoint -Method "GET" -Endpoint "/api/courses/$courseId" -Description "Get course by ID (public)"
}

# Test 14: Create course (teacher/staff only)
if ($teacherToken) {
    $courseData = @{
        courseName = "Test Course $(Get-Random)"
        code = "TEST$(Get-Random -Minimum 100 -Maximum 999)"
        credits = 3
        semester = "Fall"
        year = 2025
    }
    $authHeaders = @{
        "Content-Type" = "application/json"
        "Authorization" = "Bearer $teacherToken"
    }
    $newCourseResponse = Test-Endpoint -Method "POST" -Endpoint "/api/courses" -Description "Create course (teacher)" -Body $courseData -Headers $authHeaders
    $newCourseId = if ($newCourseResponse) { $newCourseResponse.data._id } else { $null }
}

# Test 15: Update course
if ($teacherToken -and $courseId) {
    $updateCourseData = @{
        credits = 4
    }
    $authHeaders = @{
        "Content-Type" = "application/json"
        "Authorization" = "Bearer $teacherToken"
    }
    Test-Endpoint -Method "PUT" -Endpoint "/api/courses/$courseId" -Description "Update course" -Body $updateCourseData -Headers $authHeaders
}

# TOPIC ENDPOINTS
Write-Host "`n`n### TOPIC ENDPOINTS ###`n" -ForegroundColor Magenta

# Test 16: Add topic to course
if ($teacherToken -and $courseId) {
    $topicData = @{
        name = "Test Topic"
        difficulty = "Medium"
        description = "This is a test topic"
    }
    $authHeaders = @{
        "Content-Type" = "application/json"
        "Authorization" = "Bearer $teacherToken"
    }
    $topicResponse = Test-Endpoint -Method "POST" -Endpoint "/api/courses/$courseId/topics" -Description "Add topic to course" -Body $topicData -Headers $authHeaders
    
    if ($topicResponse -and $topicResponse.data.topics -and $topicResponse.data.topics.Count -gt 0) {
        $topicId = $topicResponse.data.topics[-1]._id
        
        # Test 17: Update topic
        $updateTopicData = @{
            difficulty = "Hard"
        }
        Test-Endpoint -Method "PUT" -Endpoint "/api/courses/$courseId/topics/$topicId" -Description "Update topic" -Body $updateTopicData -Headers $authHeaders
    }
}

# ENROLLMENT
Write-Host "`n`n### ENROLLMENT ENDPOINTS ###`n" -ForegroundColor Magenta

# Test 18: Enroll student in course
if ($existingStudentToken -and $courseId -and $studentId) {
    $enrollData = @{
        courseId = $courseId
    }
    $authHeaders = @{
        "Content-Type" = "application/json"
        "Authorization" = "Bearer $existingStudentToken"
    }
    Test-Endpoint -Method "POST" -Endpoint "/api/students/$studentId/enroll" -Description "Enroll student in course" -Body $enrollData -Headers $authHeaders
}

# AI ENDPOINTS
Write-Host "`n`n### AI ENDPOINTS ###`n" -ForegroundColor Magenta

# Test 19: Generate study plan
$studyPlanData = @{
    topic = "Data Structures"
    difficulty = "Medium"
    duration = "2 weeks"
}
Test-Endpoint -Method "POST" -Endpoint "/api/ai/study-plan" -Description "Generate AI study plan" -Body $studyPlanData

# Test 20: Summarize topic
$summarizeData = @{
    topic = "Binary Search Trees"
    details = "Explain the concept of binary search trees including insertion, deletion, and search operations"
}
Test-Endpoint -Method "POST" -Endpoint "/api/ai/summarize" -Description "AI summarize topic" -Body $summarizeData

# STUDY ENDPOINTS
Write-Host "`n`n### STUDY ENDPOINTS ###`n" -ForegroundColor Magenta

# Test 21: Study assistant
$studyData = @{
    prompt = "Explain the concept of recursion with examples"
}
Test-Endpoint -Method "POST" -Endpoint "/api/study" -Description "Study assistant" -Body $studyData

# Test 22: Summarize content
$contentData = @{
    content = "Artificial Intelligence is the simulation of human intelligence processes by machines, especially computer systems. These processes include learning, reasoning, and self-correction."
}
Test-Endpoint -Method "POST" -Endpoint "/api/study/summarize" -Description "Summarize content" -Body $contentData

# Test 23: Fetch internships
Test-Endpoint -Method "GET" -Endpoint "/api/study/internships" -Description "Fetch internships"

# ERROR CASES
Write-Host "`n`n### ERROR HANDLING TESTS ###`n" -ForegroundColor Magenta

# Test 24: Invalid login credentials
$invalidLogin = @{
    email = "nonexistent@example.com"
    password = "wrongpassword"
}
Test-Endpoint -Method "POST" -Endpoint "/api/auth/login" -Description "Login with invalid credentials (should fail)" -Body $invalidLogin

# Test 25: Unauthorized access
Test-Endpoint -Method "GET" -Endpoint "/api/students" -Description "Get students without auth (should fail)"

# Test 26: Invalid student ID
if ($teacherToken) {
    $authHeaders = @{
        "Content-Type" = "application/json"
        "Authorization" = "Bearer $teacherToken"
    }
    Test-Endpoint -Method "GET" -Endpoint "/api/students/invalid-id" -Description "Get student with invalid ID (should fail)" -Headers $authHeaders
}

# Test 27: Student trying to access admin endpoint
if ($studentToken) {
    $authHeaders = @{
        "Content-Type" = "application/json"
        "Authorization" = "Bearer $studentToken"
    }
    Test-Endpoint -Method "GET" -Endpoint "/api/students" -Description "Student accessing admin endpoint (should fail)" -Headers $authHeaders
}

# SUMMARY
Write-Host "`n`n" -NoNewline
Write-Host "=" -repeat 80 -ForegroundColor Magenta
Write-Host "TEST SUMMARY" -ForegroundColor Magenta
Write-Host "=" -repeat 80 -ForegroundColor Magenta

$passCount = ($testResults | Where-Object { $_.Status -eq "PASS" }).Count
$failCount = ($testResults | Where-Object { $_.Status -eq "FAIL" }).Count
$total = $testResults.Count

Write-Host "`nTotal Tests: $total" -ForegroundColor White
Write-Host "Passed: $passCount" -ForegroundColor Green
Write-Host "Failed: $failCount" -ForegroundColor Red
Write-Host "Success Rate: $([math]::Round(($passCount/$total)*100, 2))%" -ForegroundColor Cyan

Write-Host "`n`nDetailed Results:" -ForegroundColor White
Write-Host "-" -repeat 80

$testResults | Format-Table -AutoSize

Write-Host "`nTest completed at $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Gray
