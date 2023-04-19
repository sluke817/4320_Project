# 4320_Project Backend
Powered by Amazon Web Services

### API Endpoints
Right now, the API endpoints are very simple because we don't have a need for complex functionality. We have 2 endpoints: a *get* and a *post* endpoint. The get requests returns data (if it exists) for a username. The post request creates or edits a user. Those endpoints are described below:

## Get User Information API
The first endpoint is a simple get request. Given a username, it will return a dictionary containing the information for that user. Example code for hitting the API in python is given below:

```python
import requests

url = 'https://x50060w167.execute-api.us-east-2.amazonaws.com/prod/get-user-info/kraken'
response = requests.get(url)
```

In this instance, we are querying the API for a user called ```kraken ```. Whatever username you are querying goes at the end of the string. 

A sample payload that the API returns is below:

```python

[{"status": "", "description": "", "metadata": {}}, 
[{"cell_phone": "123-456-7890", "password": "password", "hours_available": "5", 
"fname": "Kraken", "postal_address": "12345 Main Street, Columbia, MO 65201", 
"email": "somedudenamedkraken@fakeemail.com", "lname": "Krakenson", "name": "kraken"}]]

```

## Create or Edit Users
The second endpoint simply dumps a dictionary to a *post* endpoint containing the data for that user. IMPORTANT: the json **must** be json dumped instead of dumping as raw text.

An example of dumping the information to create the user ```kraken``` that was used in the last API is below:

```python

import requests
import json

record = {
    'username': 'kraken',
    'password': 'password',
    'fname': 'Kraken',
    'lname': 'Krakenson',
    'email': 'somedudenamedkraken@fakeemail.com',
    'cell_phone': '123-456-7890',
    'hours_available': '5',
    'postal_address': '12345 Main Street, Columbia, MO 65201'
}

url = 'https://x50060w167.execute-api.us-east-2.amazonaws.com/prod/add-edit'
response = requests.post(url, data=json.dumps(record))

```

The API returns a "200 OK" message if the post was successful. Or the error code and an error message if the post request failed.
