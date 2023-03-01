import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UseAlert } from '../context/AlertContext'
import commitmentService from '../services/commitment.service'
import Button from './Button'
import Form from './Form'
import PageHeader from './PageHeader'



const Commitment = () => {
    const {id} = useParams();
    const [description, setDescription] = useState('');
    const [forName, setForName] = useState('');
    const [notes, setNotes] = useState('');
    const [received, setReceived] = useState('');
    const [details, setDetails] = useState('');
    const [message, setMessage] = useState({ error: false, msg: "" });
    const navigate = useNavigate();
    const {showError,showSuccess} = UseAlert();

    const getCommitment = async() => {
        if (!id) return;
        setMessage('');
        try {
            const docSnap = await commitmentService.get(id);
            setDescription(docSnap.data().description);
            setNotes(docSnap.data().notes);
            setForName(docSnap.data().for);
            setReceived(docSnap.data().received);
            let desc = [];
            let descText = '';
            if (docSnap.data().details.age) desc.push('Age: ' + docSnap.data().details.age);
            if (docSnap.data().details.gender) desc.push('Gender: ' + docSnap.data().details.gender);
            if (docSnap.data().details.quantity) desc.push('Quantity: ' + docSnap.data().details.quantity);
            for (let i = 0; i < desc.length; i++) {
                if (i > 0) descText += ', ';
                descText += desc[i];
            }
            setDetails(descText);
        }
        catch (err) {
            setMessage({error: true, msg: err.message});
        }
    }

    const onComplete = () => {
        navigate('/commitments');
    }

    const handleCancel = (e) => {
        e.preventDefault();
        onComplete();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.target.disabled = true;
        const commitment = {
            for:forName,
            notes,
            received
        };
        try {
            if (id) {
                await commitmentService.update(id, commitment);
                showSuccess('Commitment updated successfully!');
            } else {
                await commitmentService.add(commitment);
                showSuccess('New commitment requested successfully!');
            }
            onComplete();
        }
        catch (err) {
            showError('Could not save!');
        }
    };

    useEffect(() => {
        if (id) getCommitment();
    }, [id]);

    return (
        <div>
            <PageHeader text={'Edit Commitment'} />
            <Form>
                <label className='mt-2 select-none font-medium py-2 mr-2' htmlFor={'received'}>
                    Received
                </label>
                <input type={'checkbox'} id={'received'} name={'received'} checked={received} onChange={(e) => {setReceived(e.target.checked)}} />
                <Form.Field label={'Description'}>
                    <Form.Text name={'description'} friendlyName={'Description'} readOnly={true} value={description} onChange={(e) => {setDescription(e.target.value)}} />
                </Form.Field>
                <Form.Field label={'For'}>
                    <Form.Text name={'for'} friendlyName={'For'} value={forName} onChange={(e) => {setForName(e.target.value)}} />
                </Form.Field>
                <Form.Field label={'Notes'}>
                    <Form.Textarea name={'notes'} friendlyName={'Notes'} className='h-28' value={notes} onChange={(e) => {setNotes(e.target.value)}} />
                </Form.Field>
                <Form.Field label={'Details'}>
                    <Form.Text name={'details'} friendlyName={'Details'} readOnly={true} value={details} onChange={(e) => {setForName(e.target.value)}} />
                </Form.Field>
                <Form.Buttons>
                    <Button className={'bg-green-700 text-white border-green-800 hover:bg-green-800'} onClick={handleSubmit}>Save</Button>
                    <Button className={'bg-gray-100 text-black border-gray-200 hover:bg-gray-200'} onClick={handleCancel}>Cancel</Button>
                </Form.Buttons>
            </Form>
        </div>
        
    )
}

export default Commitment