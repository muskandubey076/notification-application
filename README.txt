# Notification Application

## Files
- `index.html`: page structure and form
- `style.css`: responsive design and notification styles
- `script.js`: create, dismiss, and clear notifications
- `generate_qr.py`: creates a QR code after you add the real deployed URL

## Run in VS Code
1. Extract this folder.
2. Open the folder in VS Code.
3. Install the **Live Server** extension.
4. Right-click `index.html` and choose **Open with Live Server**.
5. The browser will open a local address, commonly `http://127.0.0.1:5500`.

Alternative: with Python installed, open a terminal in this folder and run:
`python -m http.server 8000`
Then open `http://localhost:8000`.

## Publish and QR code
The local address is only for your computer and is not a public link. To make a link accessible to other people, publish the folder using a static hosting service such as GitHub Pages. Once you have the real public URL, paste it into `APP_URL` in `generate_qr.py`, then run:
`python -m pip install qrcode[pil]`
`python generate_qr.py`
This creates `notification-app-qr.png`, which people can scan to open the deployed app.

## Note
This beginner project keeps notifications in the current browser page only. Refreshing the page clears the list. It does not send real push notifications or save data to a server/database.
