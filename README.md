# STARTER PROJECT

## Steps to Setup

1. git clone git@github.com:sjohnston92/sjohnston92-React-Rails-Starter.git `project-name`

2. cd `project-name`

3. run bundle install

4. In database.yml change name of database React_Rails_Starter to `project-name` 

5. run rails db:create db:migrate db:seed

6. rails s -p 3001 to start rails server

7. cd client && yarn start to start yarn server
## Handle Git/GitHub
you can ether remove the remote and add your own, or you can remove the git repo. Remove the remote keeps the commit history from the starter project. rm -rf .git will completely remove it.

1. remove origin git remote rm origin git remote add origin `ssh-link`

2. or rm -rf .git && git init

3. start servers

4. Remove ReadMe

