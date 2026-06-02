const letterTemplates = {
    sincere: {
        prefix: "Dear {name},\n\n",
        opening: "I want to sincerely apologize for {reason}. There's no excuse for my actions, and I take full responsibility.",
        middle: "I understand how this must have made you feel, and I genuinely regret it. {details}",
        closing: "You mean the world to me, and I'm committed to doing better. I hope you can forgive me.\n\nWith love and regret,",
        suffix: "Forever sorry"
    },
    casual: {
        prefix: "Hey {name},\n\n",
        opening: "So... I messed up with {reason}. I'm really sorry about that.",
        middle: "I know I should have handled it better. {details}",
        closing: "You're important to me, and I want to make this right. Seriously, my bad.",
        suffix: "Your apologetic friend"
    },
    formal: {
        prefix: "Dear {name},\n\n",
        opening: "I am writing to formally apologize for {reason}.",
        middle: "This was an error in judgment on my part. {details} I understand the impact of my actions and take full accountability.",
        closing: "I value our relationship greatly and am committed to rectifying this situation and preventing similar occurrences in the future.",
        suffix: "Respectfully"
    },
    humorous: {
        prefix: "Hey {name},\n\n",
        opening: "Well, I did {reason}. And yes, I know I'm an idiot. 🤦",
        middle: "In my defense... actually, there's no defense. {details}",
        closing: "But seriously, I'm sorry. You're too cool to stay mad at me forever.",
        suffix: "Your favorite goofball"
    }
};

document.getElementById('apologyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    generateLetter();
});

function generateLetter() {
    const name = document.getElementById('recipientName').value;
    const tone = document.getElementById('tone').value;
    const reason = document.getElementById('reason').value;
    const details = document.getElementById('details').value || "I realize now that I should have made better choices.";

    if (!tone) {
        alert('Please select a tone!');
        return;
    }

    const template = letterTemplates[tone];
    
    let letter = template.prefix
        .replace('{name}', name)
        + "\n\n"
        + template.opening
        .replace('{reason}', reason)
        + "\n\n"
        + template.middle
        .replace('{details}', details)
        + "\n\n"
        + template.closing
        + "\n\n"
        + template.suffix;

    displayLetter(letter);
}

function displayLetter(letter) {
    document.getElementById('letterBox').textContent = letter;
    document.getElementById('letterSection').style.display = 'block';
    document.getElementById('letterSection').scrollIntoView({ behavior: 'smooth' });
}

function copyToClipboard() {
    const letterText = document.getElementById('letterBox').textContent;
    navigator.clipboard.writeText(letterText).then(() => {
        alert('Letter copied to clipboard! 📋');
    }).catch(() => {
        alert('Failed to copy. Please try again.');
    });
}

function downloadLetter() {
    const letterText = document.getElementById('letterBox').textContent;
    const name = document.getElementById('recipientName').value;
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(letterText));
    element.setAttribute('download', `apology-letter-${name}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}