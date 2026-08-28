// ==========================================================
// Draft History
// ==========================================================

document.addEventListener('DOMContentLoaded', function () {

    // draftNumber is defined by the HTML page
    if (
        typeof draftNumber === 'undefined' ||
        !draftNumber
    ) {
        console.warn('draftNumber is not defined.');
        return;
    }


    const draftKey = `koi_Draft_${draftNumber}`;

    // Get current draft
    const content =
        localStorage.getItem(draftKey) || '';


    // Save snapshot to history
    saveDraftToHistory(
        draftNumber,
        content
    );
});


// ==========================================================
// Save Draft Snapshot to History
// ==========================================================

function saveDraftToHistory(draftNumber, content) {

    const historyKey = 'koi_draft_history';

    // Don't save empty drafts
    if (!content || content.trim().length === 0) {
        return;
    }

    let history = [];

    try {

        const savedHistory =
            localStorage.getItem(historyKey);

        if (savedHistory) {
            history = JSON.parse(savedHistory);
        }

        if (!Array.isArray(history)) {
            history = [];
        }

    } catch (error) {

        console.warn(
            'Could not read draft history.',
            error
        );

        history = [];
    }


    // Find the most recent history entry
    // for this draft
    const lastEntry = [...history]
        .reverse()
        .find(function (entry) {
            return entry.draft === draftNumber;
        });


    // Don't create duplicate history entries
    if (
        lastEntry &&
        lastEntry.content === content
    ) {
        return;
    }


    // Create new history entry
    history.push({

        draft: draftNumber,

        timestamp: new Date().toISOString(),

        content: content

    });


    // Keep only the latest 100 entries
    if (history.length > 100) {
        history = history.slice(-100);
    }


    // Save history
    localStorage.setItem(
        historyKey,
        JSON.stringify(history)
    );
}