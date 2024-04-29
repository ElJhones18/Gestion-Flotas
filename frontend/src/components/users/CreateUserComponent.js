import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
export const CreateUserComponent = () => {

    const dispatch = useDispatch();
        useEffect(async () => {
            await dispatch();
            console.log('CreateUserComponent');
        }, []);

    return (
        <div>
            CreateUserComponent
        </div>
    );
}