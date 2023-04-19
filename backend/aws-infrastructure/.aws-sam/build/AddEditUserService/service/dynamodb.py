import boto3
from boto3.dynamodb.conditions import Key
import json
import time

def get_update_params(body):
    """Given a dictionary we generate an update expression and a dict of values
    to update a dynamodb table.

    Params:
        body (dict): Parameters to use for formatting.

    Returns:
        update expression, dict of values.
    """
    update_expression = ["set "]
    update_values = dict()

    for key, val in body.items():
        update_expression.append(f" {key} = :{key},")
        update_values[f":{key}"] = val

    return "".join(update_expression)[:-1], update_values

def update_table(table, username, update_record):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table(table)

    a, v = get_update_params(update_record)

    response = table.update_item(
        Key={"name": username},
        UpdateExpression=a,
        ExpressionAttributeValues=dict(v)
        )

    return response