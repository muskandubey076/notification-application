"""
Generate a QR code for your deployed Notification Application.
1. Publish the project, for example with GitHub Pages.
2. Replace the URL below with the real public URL.
3. Install dependency: python -m pip install qrcode[pil]
4. Run: python generate_qr.py
"""
import qrcode

APP_URL = "PASTE_YOUR_REAL_PUBLIC_PROJECT_URL_HERE"

if not APP_URL.startswith(("https://", "http://")) or "PASTE_" in APP_URL:
    raise SystemExit("Please edit APP_URL and enter your real deployed project URL first.")

img = qrcode.make(APP_URL)
img.save("notification-app-qr.png")
print("QR code saved as notification-app-qr.png")
print("Encoded URL:", APP_URL)
