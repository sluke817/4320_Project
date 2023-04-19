import json
import logging
import time
from boto3.dynamodb.conditions import Key, Attr
import boto3
from pythonjsonlogger import jsonlogger
from service import service, config
from decimal import Decimal
import os
import sys

# Load environment
ENV = config.load_env()
 
LOGGER = logging.getLogger()
# Replace the LambdaLoggerHandler formatter :
LOGGER.handlers[0].setFormatter(jsonlogger.JsonFormatter())
# Set default logging level 
LOGGING_LEVEL = getattr(logging, ENV["app"]["LOGGING_LEVEL"])
LOGGER.setLevel(LOGGING_LEVEL)

def _lambda_context(context):
    """Extract information relevant from context object."""
    return {
        "function_name": context.function_name,
        "function_version": context.function_version
    }

def default(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError("Object of type '%s' is not JSON serializable" % type(obj).__name__)

# @datadog_lambda_wrapper
def lambda_handler(event, context):
    LOGGER.info("Starting lambda executing.", extra=_lambda_context(context))
    response = service.main(event, ENV)
    LOGGER.info("Successful lambda execution.", extra=_lambda_context(context))
    try:
        output = {
                'statusCode': 200,
                'headers': { # added this from ChatGPT. I have no idea what it does
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                    "Access-Control-Allow-Headers": "*"
                },
                'body': json.dumps(response,default=default)
                }
                
    except Exception as e:
        error = f"Exception {e}."
        LOGGER.error(error,exc_info=sys.exc_info())

        output = {
            'statusCode': 400,
            'headers': { # added this from ChatGPT. I have no idea what it does
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "*",
                    "Access-Control-Allow-Headers": "*"
            },
            'body': json.dumps(error, default=default)
        }
                
    return output