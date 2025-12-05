function processInputv2() {
  const input = document.getElementById("inputText").value.trim();
  const outputArea = document.getElementById("outputText");
  
  // Split the input into individual lines and process each line
  const lines = input.split('\n');
  const formattedData = [];
  let invalidLines = 0;

  // Process each line and split it by '='
  lines.forEach((line) => {
    const parts = line.split('=');
    if (parts.length === 3) {
      const [tech, account, key] = parts;  // Get tech, account, and key
      formattedData.push({ tech, account, key });
    } else {
      invalidLines++;  // Count invalid lines
    }
  });

  // If NO valid lines → stop here
  if (formattedData.length === 0) {
    outputArea.value = "";
    return;
  }

  // Show a popup with the number of input lines and processed lines
  showNotification(`<br>Total items inputted: ${lines.length}<br>Total items processed: ${formattedData.length}<br>Total invalid items: ${invalidLines}`, "summary");


  // If there are invalid lines, show an error message
  if (invalidLines > 0) {
    showNotification("Warning: Some item were not processed due to incorrect formatting. Please check the input. Proper syntax is tech=account=key", "invalid_format");
  } else {
    removeNotification("invalid_format");
  }

  // Sort by 'account' alphabetically
  formattedData.sort((a, b) => a.account.localeCompare(b.account));

  // Prepare the output as a single string
  let output = `#!/bin/bash

custom_key=""

# Function to display OTPs for the accounts
generate_otps() {
echo "TWRAM Advanced OTP Tool V2"
echo ""`;

  // Add the formatted output
  // No color: printf "%-6s | %s\\n" "$(oathtool --base32 --totp ${item.key})" "${item.account} [${item.tech}]"`;
  formattedData.forEach((item, index) => {
    output += `
printf "%-6s | %s \\033[1;34m[${item.tech}]\\033[0m\\n" "$(oathtool --base32 --totp ${item.key})" "${item.account}"`;
  });

  // Add the second section of the bash script
  output += `

# Show custom key OTP if present
if [[ -n "$custom_key" ]]; then
	custom_otp=$(oathtool --base32 --totp "$custom_key")
	echo ""
	printf "%-6s | %s \\033[1;32m[Custom Key]\\033[0m\\n" "$custom_otp" "Custom"
fi      
}

# Main script loop
while true; do
	# Check if oathtool is installed
	echo "======================================================================="
	if ! command -v oathtool &>/dev/null; then
		echo "Error: 'oathtool' is not installed. Please install it first. You may try this command: sudo apt install oathtool gnupg2"
		echo "Then you may verify the installation via: oathtool --version"
		exit 1
	fi

	# Display oathtool version
	echo "Using $(oathtool --version)"
	echo "======================================================================="

	# Display OTPs for accounts
	generate_otps

	echo "-----------------------------------------------------------------------"

	# Display menu options
	echo "Please select an action:"
	echo "1. Refresh OTPs (auto-refresh 30s)"
	echo "2. Enter custom key"

	# Read user input for option
	read -t 30 -p "Enter the option number (CTRL+C to quit): " option
	
	# Handle empty input
	if [ -z "$option" ]; then
		echo "No input provided..."
		clear
		continue
	fi

	# Handle options
	case $option in
	1) clear;;
	2) read -p "Enter custom secret key: " custom_key
	   echo "Custom key saved. It will now appear in the OTP list. (waiting 3s...)"
	   sleep 3
	   clear;;
	*) echo "Invalid option selected. Please choose a valid number. Exiting..."
	   exit 1;;
	esac

done`;

  // Display the formatted output in the output area
  outputArea.value = output; 
}