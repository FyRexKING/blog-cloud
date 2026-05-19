Just a Blogging application


curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install nodejs -y

git clone https://github.com/USERNAME/student-data-cloud.git

cd student-data-cloud
npm run install-all
npm install concurrently
nano server/.env  add MONGO_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING

nano client/src/App.jsx

npm start
