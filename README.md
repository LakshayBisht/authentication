## Run locally

**Create a folder and cd into it**

`mkdir jwt-auth`

`cd jwt-auth`

**clone the repository**

`git clone git@github.com:LakshayBisht/authentication.git`

**Install the npm packages**

`npm install`

or

`yarn install`

**Run the project locally**

`npm run dev`

or

`yarn run dev`

This API is hosted at [here](https://lakshay-user-authentication.herokuapp.com/).

## API

**POST /user/signup/**
Endpoint for signup, it also require payload in form of
	
	{
		user: {
			name: your-name,
			email: your.email@example.com,
			password: your-password
		}
	}

**POST /user/login/**
Endpoint for login, it also require payload in form of
	
	{
		user: {
			email: your.email@example.com,
			password: your-password
		}
	}

**GET /home/**
Protected endpoint home, it require Bearer Token in header of form
	
	authorization : Bearer <usertoken>