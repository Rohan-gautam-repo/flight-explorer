# Testing Guide - Flight Explorer

## 🧪 How to Test All Features

### Prerequisites
```bash
cd flight-explorer
npm run dev
```
Open browser at: `http://localhost:5173/`

---

## 1. Test Search Functionality

### Flight Number Search
1. Click "Flight Number" tab
2. Type "AA" in the search box
   - ✅ Should show flights AA123, AA567
3. Type "DL456"
   - ✅ Should show Delta flight DL456
4. Type "INVALID123"
   - ✅ Should show "No Flights Found" with suggestions

### Route Search
1. Click "Route" tab
2. Start typing "J" in Origin
   - ✅ Should show autocomplete dropdown with "JFK - New York"
3. Select "JFK"
4. Start typing "L" in Destination
   - ✅ Should show "LAX - Los Angeles", "LHR - London"
5. Select "LAX"
6. Click "Search Flights"
   - ✅ Should show JFK → LAX flights

### Autocomplete Features
1. Type "New" in Origin field
   - ✅ Should suggest airports in New York
2. Type "Los" in Destination
   - ✅ Should suggest Los Angeles (LAX)
3. Notice the 300ms debounce delay
   - ✅ Suggestions appear after you stop typing

---

## 2. Test Flight Details Modal

1. Search for any flight (e.g., "AA123")
2. Click "Details" button on a flight card
3. Verify modal shows:
   - ✅ Airline logo/code and flight number
   - ✅ Origin and destination with full city names
   - ✅ Route visual with airport codes
   - ✅ Duration display
   - ✅ Departure section (blue background):
     - Scheduled time
     - Estimated time (if different)
     - Actual time (if available)
     - Terminal and gate
   - ✅ Arrival section (green background):
     - Scheduled time
     - Estimated time (if different)
     - Actual time (if available)
     - Terminal and gate
   - ✅ Aircraft type
   - ✅ Delay information (if applicable)
4. Click "X" or backdrop to close
   - ✅ Modal closes with animation

---

## 3. Test Watchlist Features

### Add to Watchlist
1. Search for flights
2. Click the star icon (⭐) on any flight card
   - ✅ Star fills with yellow color
   - ✅ Header watchlist count increases
3. Add 2-3 more flights
   - ✅ Count updates each time

### View Watchlist
1. Click "Watchlist" in header
   - ✅ Shows all saved flights
   - ✅ Displays flight count
2. Verify all added flights are present
3. Try opening details for a watchlist flight
   - ✅ Modal opens with full information

### Remove from Watchlist
1. On watchlist page, click star icon on any flight
   - ✅ Flight disappears from list
   - ✅ Count decreases
2. On home page, remove a flight from watchlist
   - ✅ Star becomes empty
   - ✅ Count decreases

### Clear All Watchlist
1. Go to Watchlist page
2. Click "Clear All" button
   - ✅ Confirmation dialog appears
3. Click "Cancel"
   - ✅ Dialog closes, flights remain
4. Click "Clear All" again
5. Click "Yes, Clear All"
   - ✅ All flights removed
   - ✅ Empty state appears
   - ✅ "Search Flights" button visible

---

## 4. Test Loading States

### Initial Load
1. Refresh the page
2. Observe the home page
   - ✅ May briefly show loading skeletons (if API is slow)
   - ✅ Search form appears when ready

### Search Loading
1. If you modify the code to add artificial delay:
   ```typescript
   await new Promise(resolve => setTimeout(resolve, 2000));
   ```
2. Perform a search
   - ✅ Loading skeleton cards appear
   - ✅ Search button shows "Searching..."
   - ✅ Button is disabled during search

---

## 5. Test Empty States

### No Search Yet
1. Fresh page load
2. Don't search for anything
   - ✅ Shows airplane emoji
   - ✅ "Search for Flights" heading
   - ✅ Helpful instructions

### No Results Found
1. Search for "ZZZZZ999"
   - ✅ Shows magnifying glass emoji
   - ✅ "No Flights Found" heading
   - ✅ Helpful suggestions in blue box:
     - Check spelling
     - Verify codes
     - Try city names
     - Search different route

### Empty Watchlist
1. Clear all watchlist items
   - ✅ Shows star emoji
   - ✅ "No Saved Flights" heading
   - ✅ "Search Flights" call-to-action button

---

## 6. Test Error States

### Simulate API Error
To test error handling:
1. Disconnect internet (or use DevTools network throttling)
2. Comment out the mock data in `public/mock/flights.json`
3. Refresh page
   - ✅ Error message appears
   - ✅ Shows warning emoji
   - ✅ "Unable to Load Flights" heading
   - ✅ Error description
   - ✅ "Retry" button

### Test Fallback to Mock Data
1. Ensure mock data exists
2. API will timeout/fail
   - ✅ Automatically loads from mock data
   - ✅ Console shows "falling back to mock data"
   - ✅ Flights display normally

---

## 7. Test Date/Time Formatting

1. Open flight details modal
2. Check time displays:
   - ✅ Format: "Nov 3, 2025 at 08:00"
   - ✅ Scheduled times shown
   - ✅ Estimated times (yellow) if different
   - ✅ Actual times (green) if available

3. On flight cards:
   - ✅ Format: "Nov 3, 08:00"
   - ✅ Shows departure and arrival times
   - ✅ Duration between times

---

## 8. Test Responsive Design

### Mobile View (< 768px)
1. Open DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select iPhone or Android device
4. Verify:
   - ✅ Single column flight cards
   - ✅ Hamburger menu or compact nav
   - ✅ Search form stacks vertically
   - ✅ Modal is full-width with padding
   - ✅ Touch targets are large enough

### Tablet View (768px - 1024px)
1. Resize browser to tablet size
2. Verify:
   - ✅ 2-column flight grid
   - ✅ Navigation fits comfortably
   - ✅ Search form side-by-side

### Desktop View (> 1024px)
1. Full browser width
2. Verify:
   - ✅ 3-column flight grid
   - ✅ All elements properly spaced
   - ✅ Modal centered with max-width

---

## 9. Test Performance

### Debounce
1. Type rapidly in Origin field
2. Watch console for API calls
   - ✅ Only calls after 300ms pause
   - ✅ No excessive calls while typing

### Caching
1. Search for flights
2. Search again within 5 minutes
3. Check console
   - ✅ Should log "Using cached flight data"
   - ✅ No new API call made

### UseMemo
1. Open React DevTools
2. Enable "Highlight updates"
3. Type in search
   - ✅ Only necessary components re-render
   - ✅ Efficient filtering without full re-render

---

## 10. Test Data Persistence

### LocalStorage
1. Add flights to watchlist
2. Close browser tab
3. Open application again
   - ✅ Watchlist still contains all flights
4. Open DevTools → Application → Local Storage
   - ✅ Key "watchlist" exists
   - ✅ Contains JSON array of flights

---

## 11. Test Edge Cases

### Invalid Input
1. Route search with same origin/destination
   - ✅ Shows validation error
2. Flight number with special characters
   - ✅ Searches anyway (graceful handling)
3. Empty search
   - ✅ Validation prevents submission

### Duplicate Watchlist
1. Add same flight twice
   - ✅ Only appears once in watchlist
   - ✅ Star remains filled

### Long Flight Numbers
1. Search for "BA100"
   - ✅ Handles normally

---

## 12. Browser Compatibility

Test in multiple browsers:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (if on Mac)

Check for:
- CSS compatibility
- JavaScript features
- LocalStorage support
- Animation smoothness

---

## 🎯 Quick Test Checklist

Use this for rapid testing:

- [ ] Flight number search works
- [ ] Route search works
- [ ] Autocomplete appears and works
- [ ] Flight details modal opens
- [ ] All times display correctly
- [ ] Add to watchlist works
- [ ] Remove from watchlist works
- [ ] Clear all watchlist works
- [ ] Watchlist persists on refresh
- [ ] Loading skeletons show
- [ ] Empty states show correctly
- [ ] Error state shows on failure
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop
- [ ] No console errors
- [ ] Build completes successfully

---

## 🐛 Known Issues / Limitations

1. **Timezone Display**: Currently shows local time, could add timezone labels
2. **Real-time Updates**: No live updates (would need WebSocket)
3. **Offline Mode**: Requires mock data to be present
4. **Large Datasets**: Current implementation loads all flights (100+ would need pagination)

---

## 📊 Performance Metrics to Check

### Load Times
- Initial page load: < 2s
- Search results: < 500ms (with cache)
- Modal open: < 100ms (animation)

### Bundle Size
- Total JS: ~425 KB (138 KB gzipped)
- Total CSS: ~25 KB (5.4 KB gzipped)

### Lighthouse Scores (Target)
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 90
- SEO: > 90

---

## ✅ All Tests Pass?

If all features work as expected:
- Application is ready for production! 🚀
- Consider adding analytics
- Set up error tracking (e.g., Sentry)
- Deploy to hosting (Vercel, Netlify, etc.)
