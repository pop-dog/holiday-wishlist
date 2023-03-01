import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UseAlert } from '../context/AlertContext'
import presentService from '../services/present.service'
import Button from './Button'
import Form from './Form'

const Present = ({id}) => {
    const [age, setAge] = useState(0);
    const [description, setDescription] = useState('');
    const [forName, setForName] = useState('');
    const [gender, setGender] = useState('');
    const [notes, setNotes] = useState('');
    const [message, setMessage] = useState({ error: false, msg: "" });
    const navigate = useNavigate();
    const {showError,showSuccess} = UseAlert();

    const getPresent = async() => {
        if (!id) return;
        setMessage('');
        try {
            const docSnap = await presentService.get(id);
            setDescription(docSnap.data().description);
            setNotes(docSnap.data().notes);
            setForName(docSnap.data().for);
            let a = docSnap.data().age;
            if (a) {
                let aNum = parseInt(a);
                if (isNaN(aNum)) setAge(0);
                else setAge(aNum);
            }
            else setAge(0);
            let g = docSnap.data().gender;
            if (g === 'boy' || g === 'girl') setGender(g);
            else setGender('');
        }
        catch (err) {
            setMessage({error: true, msg: err.message});
        }
    }

    const onComplete = () => {
        navigate('/presents');
    }

    const handleCancel = (e) => {
        e.preventDefault();
        onComplete();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.target.disabled = true;
        if (description === '') {
            setMessage({error: true, msg: 'Description is required!'});
            return;
        };
        if (forName === '') {
            setMessage({error: true, msg: 'For is required!'});
            return;
        };
        const present = {
            age,
            gender,
            description,
            notes,
            for:forName
        };
        try {
            if (id) {
                await presentService.update(id, present);
                showSuccess('Present updated successfully!');
            } else {
                await presentService.add(present);
                showSuccess('New present requested successfully!');
            }
            onComplete();
        }
        catch (err) {
            showError('Could not save!');
        }
    };

    useEffect(() => {
        if (id) getPresent();
    }, [id]);

    return (
        <Form>
            <Form.Field label={'Age'}>
                <Form.Text name={'age'} friendlyName={'Age'} value={age} onChange={(e) => {setAge(parseInt(e.target.value))}} type={'number'} />
            </Form.Field>
            <Form.Field label={'Gender'}>
                <Form.Select name={'gender'} friendlyName={'Gender'} value={gender} onChange={(e) => {setGender(e.target.value)}}>
                    <option value=''></option>
                    <option value='boy'>Boy</option>
                    <option value='girl'>Girl</option>
                </Form.Select>
            </Form.Field>
            <Form.Field label={'Description'}>
                <Form.Text name={'description'} friendlyName={'Description'} value={description} onChange={(e) => {setDescription(e.target.value)}} />
            </Form.Field>
            <Form.Field label={'For'}>
                <Form.Text name={'for'} friendlyName={'For'} value={forName} onChange={(e) => {setForName(e.target.value)}} />
            </Form.Field>
            <Form.Field label={'Notes'}>
                <Form.Textarea name={'notes'} friendlyName={'Notes'} className='h-28' value={notes} onChange={(e) => {setNotes(e.target.value)}} />
            </Form.Field>
            <Form.Buttons>
                <Button className={'bg-green-700 text-white border-green-800 hover:bg-green-800'} onClick={handleSubmit}>Save</Button>
                <Button className={'bg-gray-100 text-black border-gray-200 hover:bg-gray-200'} onClick={handleCancel}>Cancel</Button>
            </Form.Buttons>
        </Form>
    )
}

export default Present