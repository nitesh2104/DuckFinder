# Feed Statistics

Application that allows users to enter information for
food fed to ducks!

## Features
- Add information based on country and park name
- Food item fed
- Type of food item fed
- Number of ducks fed
- How long the event occurred
- Amount of food fed
- Repetitive scheduling event
- Charts to view data statistics
- Searchable table, with pagination

### Technologies
- Python 2.7.12
- Pip
- Sqlite
- Django
- HTML, CSS, JS, Jquery, ChartJS

### Setup
- Install python 2.7.12 and pip

```
git clone git@github.com:nitesh2104/DuckFinder.git

cd DuckFinder

virtualenv venv

source venv/bin/activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

-  Go to localhost:8000/
- Done!!!

### Architecture
The application follows the standard Django enforced MVC pattern.

1. The urls.py contains the routes that user requests using http verbs from either
the browser or using external client/commands.

2. Views.py is the controller that receives the requests and provides
necessary response using models.

3. Models.py contains the classes that will be converted into sql
queries to implement tables and manipulate information within it

4. Templates directory contains the views model


