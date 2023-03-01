import { where } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UseAlert } from '../context/AlertContext'
import commitmentService from '../services/commitment.service'
import wishlistItemService from '../services/wishlistItem.service'
import Button from './Button'
import Form from './Form'

const WishlistItem = ({id, collection, editMessage, addMessage}) => {
    const [quantity, setQuantity] = useState(1);
    const [description, setDescription] = useState('');
    const [notes, setNotes] = useState('');
    const [forName, setForName] = useState('');
    const [message, setMessage] = useState({ error: false, msg: "" });
    const navigate = useNavigate();
    const {showError,showSuccess} = UseAlert();

    const getWishlistItem = async() => {
        if (!id) return;
        setMessage('');
        try {
            const docSnap = await wishlistItemService.get(id);
            setDescription(docSnap.data().description);
            setNotes(docSnap.data().notes);
            setForName(docSnap.data().for);
            let q = docSnap.data().quantity;
            if (q) {
                let aNum = parseInt(q);
                if (isNaN(aNum)) setQuantity(0);
                else setQuantity(aNum);
            }
            else setQuantity(1);
        }
        catch (err) {
            setMessage({error: true, msg: err.message});
        }
    }

    const onComplete = () => {
        navigate('/' + collection);
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
        const wishlistItem = {
            quantity: quantity || 0,
            description: description || '',
            notes: notes || '',
            type:collection,
            for:forName
        };
        try {
            if (id) {
                await wishlistItemService.update(id, wishlistItem);
                setMessage({error: false, msg: editMessage});
                showSuccess(editMessage);
            } else {
                await wishlistItemService.add(wishlistItem);
                showSuccess(addMessage);
            }
            onComplete();
        }
        catch (err) {
            showError('Could not update item!');
            e.target.disabled = false;
        }
    };

    useEffect(() => {
        if (id) getWishlistItem();
    }, [id]);

    return (
        <Form>
            <Form.Field label={'Quantity'}>
                <Form.Text name={'quantity'} friendlyName={'Quantity'} value={quantity} onChange={(e) => {setQuantity(parseInt(e.target.value))}} type={'number'} />
            </Form.Field>
            <Form.Field label={'Description'}>
                <Form.Text name={'description'} friendlyName={'Description'} value={description} onChange={(e) => {setDescription(e.target.value)}} />
            </Form.Field>
            <Form.Field label={'For'}>
                <Form.Text name={'forName'} friendlyName={'For'} value={forName} onChange={(e) => {setForName(e.target.value)}} />
            </Form.Field>
            <Form.Field label={'Notes'}>
                <Form.Textarea name={'notes'} friendlyName={'Notes'} value={notes} className='h-28' onChange={(e) => {setNotes(e.target.value)}} />
            </Form.Field>
            <Form.Buttons>
                <Button className={'bg-green-700 text-white border-green-800 hover:bg-green-800'} onClick={handleSubmit}>Save</Button>
                <Button className={'bg-gray-100 text-black border-gray-200 hover:bg-gray-200'} onClick={handleCancel}>Cancel</Button>
            </Form.Buttons>
        </Form>
    )
}

export default WishlistItem