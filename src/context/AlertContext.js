import { useContext, createContext, useState, useEffect, useRef } from 'react';
import Alert from '../components/Alert';

const AlertContext = createContext();

export const AlertContextProvider = ({children}) => {

    const [alert, setAlert] = useState({});
    let timeouts = useRef(0);

    const hide = () => {
        setAlert({});
    }

    useEffect(() => {
        if (alert.message) {
            timeouts.current = timeouts.current + 1;
            setTimeout(() => {
                timeouts.current = timeouts.current - 1;
                if (timeouts.current == 0) {
                    hide();
                }
            }, 8000);
        }
    },[alert]);

    const showError = (message, title) => {
        setAlert({type: 'error', message, title});
    };

    const showSuccess = (message, title) => {
        setAlert({type: 'success', message, title});
    };

    const showInfo = (message, title) => {
        setAlert({type: 'info', message, title});
    };

    return (
        <AlertContext.Provider value={{ showError, showSuccess, showInfo, hide }}>
            {children}
            <Alert alert={alert} />
        </AlertContext.Provider>
    );
};

export const UseAlert = () => {
    return useContext(AlertContext);
};