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

      // LOCK function - toggle + restore logic
      function toggleLock(ids, lockKey) {
        const isLocked = localStorage.getItem(lockKey) !== null;
        const newLockedState = !isLocked;
      
        ids.forEach(id => {
          const el = document.getElementById(id);
          if (!el) return;
          el.readOnly = newLockedState;
        });
      
        if (newLockedState) {
          localStorage.setItem(lockKey, "1");
        } else {
          localStorage.removeItem(lockKey);
        }
      
        updateLockIcon(newLockedState);
      }
      
      // LOCK function - initializer
      function initLock(ids, lockKey) {
        const isLocked = localStorage.getItem(lockKey) !== null;
      
        ids.forEach(id => {
          const el = document.getElementById(id);
          if (!el) return;
          el.readOnly = isLocked;
        });
      
        updateLockIcon(isLocked);
      }
      
      // LOCK function - helper
      function updateLockIcon(isLocked) {
        const icon = document.querySelector("#lockBtn i");
        if (!icon) return;
      
        icon.classList.toggle("bi-lock-fill", isLocked);
        icon.classList.toggle("bi-unlock-fill", !isLocked);
      }

      function updateCharCount(text, targetId) {
        const charCount = text.length;

        const rowCount = text.length === 0
          ? 0
          : text.split(/\r\n|\r|\n/).length;

        const el = document.getElementById(targetId);
        if (el) {
          el.textContent = "length: " + charCount + ", lines: " + rowCount;
        }
      }