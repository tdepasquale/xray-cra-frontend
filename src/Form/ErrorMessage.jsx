import React from "react";
import { Message } from "semantic-ui-react";

const ErrorMessage = ({ error, text }) => {
  return (
    <Message error>
      <Message.Header>{error.response.statusText}</Message.Header>
      {error.response.data &&
        Object.keys(error.response.data.errors).length > 0 && (
          <Message.List>
            {Object.values(error.response.data.errors)
              .flat()
              .map((err, i) => (
                <Message.Item key={i}>{err}</Message.Item>
              ))}
          </Message.List>
        )}
      {text && <Message.Content content={text} />}
    </Message>
  );
};

export default ErrorMessage;
