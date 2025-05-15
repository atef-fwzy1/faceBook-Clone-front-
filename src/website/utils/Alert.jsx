import Alert from 'react-bootstrap/Alert';

function AlertMessage({state}) {
    //   'success',
        // 'danger',
  return (
  
        <Alert key={state} variant={state}>
          This is a {state} alert—check it out!
        </Alert>

  );
}

export default AlertMessage;