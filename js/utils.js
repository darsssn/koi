      // Clear Button functionality
      function clearMultiple(storageKeys = []) {
        // Remove all specified localStorage keys
        storageKeys.forEach(key => {
          localStorage.removeItem(key);
        });
        window.location.reload(); // Refresh page to reflect changes
      }

      // Copy Button functionality
      function copyTextarea(textareaId) {
        const textarea = document.getElementById(textareaId);
  
        navigator.clipboard
          .writeText(textarea.value)
          .then(() => {
            showToast("Text copied to clipboard!");
          });
      }      

      // Function to toggle word wrap
      function toggleWordWrap(textareaIds = []) {
      
        textareaIds.forEach(id => {
          const textarea = document.getElementById(id);
          if (!textarea) return;
      
          const isNoWrap = getComputedStyle(textarea).whiteSpace === "nowrap";
      
          if (isNoWrap) {
            textarea.style.whiteSpace = "normal";
            textarea.setAttribute("wrap", "soft");
          } else {
            textarea.style.whiteSpace = "nowrap";
            textarea.setAttribute("wrap", "off");
          }
        });
      }

      // Function to update character count display
      function updateCharCount(text) {
        const charCount = text.length;

        // Count rows (handles \n and \r\n properly)
        const rowCount = text.length === 0 
          ? 0 
          : text.split(/\r\n|\r|\n/).length;

        document.getElementById('charCount').textContent = "length: " + charCount + ", lines: " + rowCount;
      }