# Wicked Cocktails

### Project Link

https://project-two-cocktail-app-arip.herokuapp.com/

# Intallation Instructions

- To use this project locally, fork and clone this repository.
- Next, in your terminal, go to the locally-cloned repository and run npm init -y
- Open the repo and navigate to package.json file and see a list of npm packages listed under dependencies
  Run npm i in the terminal to download all the required npm packages. node_modules should appear in the folder
- Check to see if node_modules and .env are in the .gitignore file before committing to the remote repository. If not, run the commands echo node_modules >> .gitignore and echo .env >> .gitignore
- Then go to https://api-ninjas.com/ and sign up for an account. Afterwards, go to My Account, copy the API key, then create a variable called API_KEY in the .env and paste the API key there. Example: API_KEY='[API key is pasted here, do not include the square brackets]'
- Run the following commands: sequelize db:create then sequelize db:migrate
- To view the databases, run psql in your terminal
- Then run nodemon in your terminal and type in localhost:8000 in your browser

## Welcome!

No need to fumble through sites or apps to find the perfect drinks for your next get together. Search thousands of cocktail recipes by name or ingredients with Wicked Cocktails.

## How it Works

To get started, simply use the search bar to generate a list of cocktail recipes by matching either the name or ingredients of the drink you are looking for. For example, if you search for "bloody," you will get a list of drinks that contain the word "bloody" in their name, such as the classic Bloody Mary and the tasty Bloody Margarita.

But the search function doesn't stop there! You can also use it to find cocktails based on specific ingredients by separating the keywords with commas. So if you want to find a drink that includes vodka and cranberry juice, simply search for "vodka, cranberry" and you will get a list of cocktails that match those ingredients.

Every search result includes not only the name of the cocktail, but also the full recipe and instructions on how to make it yourself at home. This way, you can easily mix up your own delicious drinks without having to worry about trying to remember the recipe or proportions.

And if you don't want to forget about all the amazing cocktails you've found and want to save them for later, you can create a login to save your favorite mixes to your own personal favorites list. This way, you can easily access all your go-to drinks in one convenient place. So go ahead and give it a try – you'll be mixing up delicious cocktails in no time!

### RESTful CRUD Api<img width="503" alt="Screen Shot 2022-12-22 at 4 58 30 PM" src="https://user-images.githubusercontent.com/115594817/209239747-75376ddb-e5ee-4a37-b85e-060e90078901.png">

### RESTful CRUD Api

<img width="554" alt="RESTful CRUD API" src="https://user-images.githubusercontent.com/115594817/209220703-2ca5b570-79be-4595-9f64-827d7ca70ea1.png">

### ERD Model Relations![UpdatedERD](https://user-images.githubusercontent.com/115594817/209237007-45520309-1af5-49a8-873a-77e72031167d.png)

### Postman API Query Results

![Screen Shot 2022-12-21 at 7 27 46 PM](https://user-images.githubusercontent.com/115594817/209176372-02e4c9d7-a0ad-4559-ab56-e4090a2afd1a.png)

### Wicked Cocktails Search Page

<img width="710" alt="homepage" src="https://user-images.githubusercontent.com/115594817/209176215-2cc3bdee-471c-44b0-9eae-e5a41797d0f9.png">

### Wicked Cocktails Search Results

![searchresults](https://user-images.githubusercontent.com/115594817/209176304-91e0f964-0d03-4a19-a3e8-7fc0e689e403.png)

### Wicked Cocktails Favorites Page

![favorites](https://user-images.githubusercontent.com/115594817/209176409-33f40638-3a6c-4d49-9322-2d3db1f2af8b.png)

## User Stories

- As a user, I want to be able to create a login so that my profile is viewable by only me.

- As a user, I want to be able to search for cocktail recipes using the search bar so that I can easily find the drinks I'm looking for.

- As a user, I want to be able to save my favorite cocktail recipes to a personal favorites list so that I can easily access them in the future.

- As a user, I want to be able to search for cocktails by ingredient or name so that I can find exactly what I'm looking for.

- As a user, I want to be able to view the full recipe and instructions for each cocktail so that I can accurately mix the drinks at home

## MVP

- Build a web application using Express, EJS, and Sequelize as the primary technologies.
- Connect to a third-party API that provides cocktail recipes and use Sequelize to create a local database to store information about users, drinks, and comments.
- Implement a search function that allows users to search for cocktail recipes by name or ingredients using simple keywords.
- Allow users to create an account and sign in to the application using a secure authentication system.
- Give users the ability to save their favorite cocktail recipes to a personal favorites list by clicking a "favorite" button on the recipe page.
- Create a page that displays all of a user's saved favorite cocktail recipes in one place and allows them to easily access, view, and comment on them.
- Implement a feature that allows users to delete individual cocktail recipes from their favorites list if they no longer want to keep them saved.

## Stretch Goals

- Include a "fun fact cocktail fact generator" button...Because fun fact..everyone enjoys a fun fact with their cocktail _insert dad joke laugh_
- Include a cocktail glass that fills in multi colors based on the quantity of each ingredient.
- OR Include picture of each drink
- Allow users to upload and share their own original cocktail recipes with the community.
- Create a "random drink generator" button that suggests a random cocktail recipe to the users folks that are feeling spicy
- Allow users to upload and share their own original cocktail recipes with the community.

## Post-Project Reflection

What my project was:

My project was a web application that allows users to search for and save cocktail recipes. The application connects to a third-party API to retrieve the recipes and uses a local database to store user information, saved cocktails, and comments.

What I enjoyed:

I enjoyed the process of building the web application and learning about the different technologies used (Express, EJS, and Sequelize). It was nice to see the application come together and be able to use it myself. I was able to use some features and methods from previous projects and deliverables and implement them into my project.

What I found difficult:

The most difficult part initally was connecting to the third-party API and properly formatting the data to be stored in the local database. I tried a few different API sources and it took some trial and error to get everything working correctly.

What worked well for me:

I found that breaking the project down into smaller tasks and tackling them one at a time helped me to stay focused and make progress. Working a little everyday helped me not feel like I was falling behind on my tasks. I also found it helpful to refer back to previous deliverables and projects.

Things I would do next time:

Next time, I would try to plan out the structure and organization of my project in more detail before diving in. I think this would help me to better understand the required views and routes before hand. My project isnt as D.R.Y. as it could be when it comes to the ejs. files. For this project, it works. But I can see how expanding on this project would make it a challenge to understand and maintain in the future.

Unsolved problems:
I would like to find a way to improve the favorite function so that when a user favorites a cocktail, they can continue to favorite multiple cocktails from the same search, until they are ready to make another search, or view their favorites. At the moment, the page refreshes and clears the search results with each facorite.

References
https://api-ninjas.com/
https://getbootstrap.com/docs/5.0/getting-started/introduction/
https://unsplash.com/
https://www.cocktailsaway.com/blog/cocktail-facts/
