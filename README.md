# MYPO Online Fashion Store

MYPO is a responsive front-end online fashion store built with HTML, CSS, and vanilla JavaScript. Users can browse products, view details, add products to a cart, create an account, manage their profile, and post customer reviews.

## Features

- Responsive home, shop, blog, review, about, and contact pages
- Product categories and product detail modal
- Shopping cart saved in browser storage
- Sign up, sign in, persistent sessions, and logout
- Profile editing for name, email, and password
- SHA-256 password hashing with the Web Crypto API
- Logged-in users can post persistent star-rated reviews
- Reviews remain after refresh, logout, and login
- Pathein Township map on the contact pages
- Mobile-friendly layouts for phones and tablets

## Requirements

- A modern web browser
- Node.js or another local static web server

## Run locally

From this directory, start a static server:

```powershell
npx --yes serve . -l 5500
```

Then open:

```text
http://127.0.0.1:5500/index.html
```

Do not open the HTML files directly with `file://`. The cart, account, session, and review features are intended to run through HTTP.

## Project structure

```text
FINAL_MYPO/
├── css/              Shared and page-specific styles
├── img/              Product, banner, blog, and site images
├── index.html        Home page
├── shop.html         Product listing
├── addtocart.html    Shopping cart
├── login.html        Sign-in and sign-up
├── profile.html      Account profile
├── review.html       Customer reviews
├── about.html        About page
├── contact.html      Contact page
├── products.js       Product data
├── app.js            Product listing behavior
├── auth.js           Shared session and profile header behavior
├── login.js          Account creation and sign-in
├── profile.js        Profile editing and logout
├── addtocart.js      Cart count and navigation
└── addtocartpage.js  Cart page behavior
```

## Browser storage

This is currently a browser-only prototype. It stores data in `localStorage`:

| Key | Purpose |
| --- | --- |
| `mypo-users` | Registered user records |
| `mypo-session` | Current signed-in user |
| `mypo-reviews` | Submitted customer reviews |
| `carts` | Shopping cart items |

Data is specific to the current browser and device. Clearing browser storage removes it. Although passwords are hashed before storage, this is not production authentication; a real deployment should use a secure backend, HTTPS, server-side password hashing, recovery, and access controls.

## Account and reviews

After registration or login, the user name appears in the shared header. Clicking it opens the profile page, where the user can update their name, email, or password.

Signed-in users can post a review and choose a rating from one to five stars. The reviewer name is taken from the signed-in account. Occupations are not collected or displayed. When a profile is updated, the user’s existing reviews are updated too.

## GitHub Pages deployment

The repository includes `.github/workflows/pages.yml`. Each push to `main` uploads the project to GitHub Pages using the official Pages actions. In the GitHub repository settings, set **Pages → Source** to **GitHub Actions** if it is not already enabled.

## Limitations

This project does not currently include a cloud database, server-side authentication, cross-device synchronization, real payment processing, server-side orders, inventory management, or an admin dashboard. Firebase Authentication and Firestore can be added later for production-style shared data.

