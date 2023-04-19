import boto3
from boto3.dynamodb.conditions import Key
import json
import time

def get_event_date_table(username, table_name,LOGGER):
    dynamo = boto3.resource('dynamodb')
    table = dynamo.Table(table_name)

    response = table.query(
        KeyConditionExpression=Key('name').eq(str(username))
    )

    LOGGER.info(response)

    return response.get('Items')