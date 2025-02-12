# 🏡 Housemate Chore Scheduler  

This is a simple web-based chore assignment tool that fairly rotates household cleaning tasks among housemates every week.  
![Image title](https://media2.giphy.com/media/upeUCSCeNo4qqHlxgW/200w.gif?cid=6c09b952a7sigimf2m8joqzf7kvkqs4t2r0kbea5rz00hfii&ep=v1_gifs_search&rid=200w.gif&ct=g)

## 📌 Features  
✅ **Automatic Rotation** – Tasks update every Monday, ensuring fairness.  
✅ **Off-Duty System** – One housemate gets a break each week.  
✅ **Checkmarks for Completion** – Tasks can be marked as done, and checkboxes persist until the next reset.  
✅ **Easy to Use** – Just open the website to see your assigned tasks.  

## 🚀 How It Works  
- Every **Monday**, the system assigns new tasks to housemates.  
- One housemate is **off-duty** each week. (Since there are less tasks than members, in this case) 
- Assignments are based on the current **week number** to ensure fairness.  
- Checkboxes allow housemates to mark tasks as completed (saved locally).  

## 🎨 Customization  
- Modify `housemates` and `tasks` in `script.js` to match your house setup.  
- Adjust styles in `styles.css` to match your preferences.  (I used my college colors!)

## 📌 Future Improvements  
- **Notifications** to remind housemates of their tasks.  
- **User login** to track task history.  
- **Custom reset day** (e.g., Sunday instead of Monday).  


