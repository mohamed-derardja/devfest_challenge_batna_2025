const Item = require('../models/Item');
const { compareItemsWithGemini } = require('../services/geminiCompare');

const compareItem = async (req, res) => {
  try {
    const itemId = req.params.id;

    // 1️⃣ Fetch the target item
    const targetItem = await Item.findById(itemId);
    if (!targetItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // 2️⃣ Determine opposite status
    const oppositeStatus = targetItem.status === 'lost' ? 'found' : 'lost';

    // 3️⃣ Fetch candidates
    const candidates = await Item.find({
      status: oppositeStatus,
      category: targetItem.category,
      location: targetItem.location
    }).limit(10);

    if (candidates.length === 0) {
      return res.json({
        success: true,
        bestMatchId: null,
        message: 'No candidates found in the database'
      });
    }

    // 4️⃣ Prepare data for AI
    const aiResults = await compareItemsWithGemini(
      {
        id: targetItem._id,
        name: targetItem.name,
        color: targetItem.color,
        description: targetItem.description,
        date: targetItem.date,
        location: targetItem.location
      },
      candidates.map(c => ({
        id: c._id,
        name: c.name,
        color: c.color,
        description: c.description,
        date: c.date,
        location: c.location
      }))
    );

    // 5️⃣ DEBUG: log raw AI output
    console.log('AI Results Raw:', aiResults);

    // 6️⃣ Coerce similarityScore to number and filter strong matches
const strongMatches = aiResults
  .map(r => ({
    candidateId: r.candidateId,
    similarityScore: (Number(r.similarityScore) || 0) * 100, // scale 0–1 → 0–100
    shortReason: r.shortReason
  }))
  .filter(r => r.similarityScore >= 80)
  .sort((a, b) => b.similarityScore - a.similarityScore);

    // 7️⃣ Pick the best match
    const bestMatch = strongMatches.length > 0 ? strongMatches[0].candidateId : null;

    // 8️⃣ Respond
    res.json({
      success: true,
      bestMatchId: bestMatch,
      strongMatches // optional: return all strong matches for debugging
    });

  } catch (error) {
    console.error('Compare Item Error:', error);
    res.status(500).json({
      success: false,
      message: 'Comparison failed',
      error: error.message
    });
  }
};

module.exports = { compareItem };
