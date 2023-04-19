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
        if '/get-user-info' in event['path']:

            username = str(event['pathParameters']['username'])
            user_dynamo_table = environment['dynamodb']['USER_TABLE']

            LOGGER.info('preparing for querying dynamodb table')

            response = dynamodb.get_event_date_table(username, user_dynamo_table, LOGGER)

            LOGGER.info(response)
    
    except KeyError as e:
        response = None
        error = f"Missing required field {e}."
        LOGGER.error(error)
        execution_event.update({"status": "Error", "description": error, "metadata": event})
        return 400, error
    finally:
        LOGGER.info(execution_event)

    return execution_event, response