# front-view-app — Frontend

## Stack
- React 19 + TypeScript (CRA)
- React Router v7
- Axios for API calls (withCredentials: true for session cookies)

## Key Config
- `package.json:5` — `"proxy": "http://localhost:8080"` (dev only)
- `src/setupProxy.js` — if custom proxy rules needed

## Auth Flow
1. User logs in via API `/login` (sets `JSESSIONID` cookie)
2. All subsequent requests include cookie automatically
3. API returns 401 if session invalid → redirect to login

## Adding API Endpoints
1. Check `grc-api` for new DTOs/endpoints
2. Update `src/api/*.ts` service layer
3. Update TypeScript interfaces to match API response
4. Test with dev servers running

## Scripts
- `npm start` — dev server (port 3000)
- `npm run build` — production build
- `npm run server` — json-server mock (port 13000)