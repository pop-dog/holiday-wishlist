import { TrashIcon } from '@heroicons/react/24/outline';
import { where } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react'
import { UseAlert } from '../context/AlertContext';
import { UserAuth } from '../context/AuthContext';
import { asNum, displayAge, displayGender } from '../helpers/display.helpers';
import commitmentService from '../services/commitment.service';
import AngelTree from './AngelTree';
import Button from './Button';
import Grid from './Grid'
import PageHeader from './PageHeader'

const ShoppingList = () => {
    const {user} = UserAuth();
    const [commitments, setCommitments] = useState([]);
    const {showInfo} = UseAlert();
    let timeouts = useRef([]);
    const getCommitments = async() => {
        const data = await commitmentService.all(where('user', '==', user.uid));
        setCommitments(data.docs.map((doc) => ({...doc.data(), id:doc.id})));
    }
    useEffect(() => {
        getCommitments();
    }, []);

    const onSetPurchased = async (commitment) => {
        commitmentService.update(commitment.id, {purchased:!commitment.purchased});
        setCommitments(current =>
            current.map(obj => {
                if (obj.id === commitment.id) {
                    return {...obj, purchased: !obj.purchased};
                }
                return obj;
            }),
        );
    }

    const removeCommitment = async (e, commitment) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to remove this commitment from your shopping list?")) {
            await commitmentService.safeDelete(commitment);
            getCommitments();
            showInfo('Commitment removed.');
        }
    }

  return (
    <div className='flex flex-row w-full'>
        <div className='font-[mali] flex flex-col bg-amber-100 w-full rounded drop-shadow-md mt-8 mr-8'>
            <h1 className='text-xl mx-4 mt-2 border-2 text-slate-600 pb-1 border-transparent border-b-slate-400'>My Shopping List</h1>
            {commitments.length > 0 &&
                <ul className='space-y-1 list-insid p-4 '>
                {commitments.map((commitment, index) =>
                    (
                        <li key={'item_' + index} className='border border-transparent border-b-slate-400 flex flex-row justify-between'>
                            <span className='cursor-pointer' onClick={(e) => {onSetPurchased(commitment)}} key={'row_' + commitments.indexOf(commitment)}>
                                <CommitmentListItem purchased={commitment.purchased || false} type={commitment.to.path.split('/')[0]} details={commitment.details} description={commitment.description} />
                            </span>
                            <span>
                                <Button className={'bg-red-700 border-red-800 hover:bg-red-800'} onClick={(e) => {removeCommitment(e, commitment)}}>
                                    <TrashIcon className='w-4 h-4 text-white cursor-pointer font-bold'  />
                                </Button>
                            </span>
                        </li>
                    )
                )}
            </ul>
            }
            {commitments.length == 0 &&
            <span className='p-4 font-[mali]'>You don't have any items in your shopping list yet.</span>
            }
        </div>
        <AngelTree />
    </div>
    

  )
}

const CommitmentListItem = ({type, description, details, purchased}) => {
    return (
        <div>
            {type == 'presents' && 
                <Present description={description} age={displayAge(details.age)} gender={displayGender(details.gender)} purchased={purchased} />
            }
            {type == 'wishlistItems' && 
                <WishlistItem description={description} quantity={details.quantity} purchased={purchased} />
            }
        </div>
    )
}

const Present = ({description, age, gender, purchased}) => {
    return (
        <div className='flex flex-row mb-2'>
            <span className={'mr-2 font-medium py-1'}>
                <input type={'checkbox'} checked={purchased} readOnly></input>
            </span>
            <span className={'mr-2 font-medium py-1' + (purchased ? ' line-through' : '')}>
                {description}
            </span>
            {gender && gender=='Boy' &&
                <span className='px-1 mr-2 rounded border-dashed border-2 border-sky-400 text-sky-600'>{gender}</span>
            }
            {gender && gender=='Girl' && 
            <span className='px-1 mr-2 rounded border-dashed border-2 border-rose-400 text-rose-600'>{gender}</span>
            }
            {age &&
            <span className='px-1 mr-2 rounded border-dashed border-2 border-gray-600'>{age}</span>
            }

        </div>
    )
    
}

const WishlistItem = ({description, quantity, purchased}) => {
    return (
    <div className='flex flex-row mb-2'>
            <span className={'mr-2 font-medium py-1'}>
                <input type={'checkbox'} checked={purchased} readOnly></input>
            </span>
            <span className={'mr-2 font-medium py-1' + (purchased ? ' line-through' : '')}>
                {description}
            </span>
            {asNum(quantity) > 1 && 
                <span className='px-1 mr-2 rounded border-dashed border-2 border-gray-600'>
                    x{quantity}
                </span>
            }
        </div>
    )
}

export default ShoppingList