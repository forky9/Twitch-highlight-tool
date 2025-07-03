# tutorial

💻 TWITCH CHAT HIGHLIGHTER SETUP (FULL INSTRUCTIONS)

1. ✅ Install Node.js:
   - Go to https://nodejs.org
   - Click the green “LTS” button to download.
   - Install it with default settings (make sure “Add to PATH” is checked).
   - After installing, press the Windows key, type "PowerShell", and open it.
   - Type the following to check that Node is installed:
     node -v
     npm -v
   - If both show version numbers, you’re ready.

2. 📁 Create Your Project Folder:
   - In PowerShell, type:
     mkdir cinnamunch-chat-highlighter
     cd cinnamunch-chat-highlighter

3. 📦 Start a Node.js Project:
   - Type this to auto-generate a project file:
     npm init -y

4. 📚 Install Required Libraries:
   - Type:
     npm install tmi.js express socket.io

5. 🧠 Create the Server File (`index.js`):
   - Press Windows + E to open File Explorer.
   - Go to this pc, users then go to the `cinnamunch-chat-highlighter` folder you made.
   - Right-click an empty area > New > Text Document.
   - Rename it to: index.js (remove the `.txt` extension).
   - Open it with Notepad or your favorite code editor.
   - Paste in the full code I gave you for `index.js`.
   - IMPORTANT: Change `'your_channel_name_here'` to your Twitch name in **lowercase**.

6. 🌐 Create the Client Folder and HTML File:
   - In File Explorer, still inside your project folder:
     Right-click > New > Folder > name it: public
   - Open the `public` folder.
   - Right-click > New > Text Document > name it: index.html
   - Open it and paste the HTML code I gave you earlier.
   - Save and close.

7. ▶️ Run Your Server:
   - Back in PowerShell, still in your project folder, type:
     node index.js
   - You should see:
     “Server running on http://localhost:3000”

8. 🧪 Test It:
   - Open your web browser and go to:
     http://localhost:3000
   - Send messages in your Twitch chat like “save” or “remind”.
   - They will pop up on screen.
   - You can type words into the box to add/remove key phrases live.

9. 🛑 To Stop the Server:
   - In PowerShell, press:
     Ctrl + C

DONE! 🎉 Your overlay is working! You can now stream with it and share the tool if you want.

from -Forky999
