import logging
import json
from service import dynamodb

LOGGER = logging.getLogger(__name__)

def main(event, environment):
    LOGGER.info(event)

    # error message template
    execution_event = {
        'status': '',
        'description': '',
        'metadata': {}
    }

    try:
        if '/add-edit' in event['path']:

            payload = json.loads(event['body'])
            user_dynamo_table = environment['dynamodb']['USER_TABLE']

            LOGGER.info('preparing for updating dynamodb table')

            username = str(payload.get('username'))

            record = {
                'password': str(payload.get('password')),
                'fname': str(payload.get('fname')),
                'lname': str(payload.get('lname')),
                'email': str(payload.get('email')),
                'cell_phone': str(payload.get('cell_phone')),
                'hours_available': str(payload.get('hours_available')),
                'postal_address': str(payload.get('postal_address'))
            }

            LOGGER.info(record)

            LOGGER.info('updating lineup dynamodb table')

            dynamodb.update_table(user_dynamo_table, username, record)

            response = 'OK'
    
    except KeyError as e:
        response = None
        error = f"Missing required field {e}."
        LOGGER.error(error)
        execution_event.update({"status": "Error", "description": error, "metadata": event})
        return 400, error
    finally:
        LOGGER.info(execution_event)

    return execution_event, response