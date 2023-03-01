import { GiftIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { where } from 'firebase/firestore';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { UseAlert } from '../context/AlertContext';
import { UserAuth } from '../context/AuthContext';
import { asNum, displayNum } from '../helpers/display.helpers';
import dataService from '../services/data.service';
import wishlistItemService from '../services/wishlistItem.service';
import Button from './Button';
import Form from './Form';
import Grid from './Grid';
import Modal from './Modal';

const WishlistItems = ({collection, singularName, pluralName}) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [commitQuantity, setCommitQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalItem, setModalItem] = useState({});
  const {user,isAdmin,displayName,username} = UserAuth();
  const {showSuccess,showError,showInfo} = UseAlert();
  const getWishlistItems = async() => {
    const data = await wishlistItemService.all(where('type','==',collection));
    setWishlistItems(data.docs.map((doc) => ({...doc.data(), committed:asNum(doc.data().committed), id:doc.id, ref:doc.ref})));
  }

  useEffect(() => {
    getWishlistItems();
  }, []);

  useEffect(() => {
    if (!showModal) {
      setCommitQuantity(1);
      setModalItem({});
    }
  }, [showModal]);

  const navigate = useNavigate();

  const handleDelete = async (row) => {
    if (window.confirm('Are you sure you want to delete this ' + singularName.toLowerCase() + ' request?')) {
      try {
        if (row.commitments) {
          for (let index = 0; index < row.commitments.length; index++) await dataService.deleteRef(row.commitments[index]);
        }
        await wishlistItemService.delete(row.id);
        showInfo('Item deleted!');
      }
      catch (ex) {
        showError('We could not delete this item.', 'Oops!');
      }
      getWishlistItems();
    }
  }

  const handleCommit = async (row) => {
    // Validate
    if (isNaN(commitQuantity) || commitQuantity <= 0 || commitQuantity > (modalItem.quantity - modalItem.committed)) {
      showError('Quantity is invalid.','Cannot submit!');
      return;
    }


    let updateItem = {};
    if (row) updateItem = row;
    else updateItem = modalItem;

    try {
      await wishlistItemService.addCommitment(updateItem.id, user, commitQuantity, displayName || '', username || '', updateItem.for || '');
      showSuccess('Your commitment has been saved.', 'Thank you!');
    }
    catch (ex) {
      showError('There was a problem saving your commitment.', 'Oops!');
    }
    setShowModal(false);

    getWishlistItems();
  }

  const showCommitModal = (row) => {
    if (row.quantity == 1) {
        if (window.confirm("Are you sure you want to commit to buy this item?")) {
          setCommitQuantity(1);
          handleCommit(row);
        }
    } else {
        setModalItem(row);
        setShowModal(true);
    }

  }

  const columns = [];
  if (isAdmin) {
    columns.push({
      name: 'Edit',
      selector: row => <Link to={'/' + collection + '/edit/' + row.id}><PencilSquareIcon className='w-5' /></Link>,
    });
  }

  columns.push({
    name: 'Description',
    selector: row => row.description,
  });

  columns.push({
    name: 'Needed',
    selector: row => displayNum(row.quantity),
  });

  columns.push({
    name: 'Committed',
    selector: row => displayNum(row.committed),
  });

  if (isAdmin) {
    columns.push({
        name: 'For',
        selector: row => row.for
      });
    columns.push({
        name: 'Notes',
        selector: row => row.notes
      });
  }
  columns.push({
    name: 'Actions',
    selector: row =>
      <div className='flex flex-row [&>*]:mr-2'>
        {(row.quantity > (row.committed || 0)) && <Button className={'bg-green-700 border-green-800 text-white hover:bg-green-800'} onClick={(e) => {showCommitModal(row)}}><GiftIcon className='text-white w-6' /></Button>}
        {isAdmin && <Button className={'bg-red-700 border-red-800 text-white hover:bg-red-800'} onClick={(e) => {handleDelete(row)}}><TrashIcon className='w-5' /></Button>}
      </div>
  });



  return (
    <div className="flex flex-col">
        {isAdmin && 
        
        <div className='flex flex-row'>
        <Button className={'bg-green-700 border-green-800 text-white hover:bg-green-800'} onClick={(e) => navigate('/' + collection + '/new')}>{'Request ' + pluralName}</Button>
        </div>
        }
        
        <Grid 
        columns={ columns }
        data={wishlistItems}
        />

        <Modal title={'How many would you like to commit to?'} open={showModal} setOpen={setShowModal} buttons={[{onClick:(e) => {handleCommit()}, content:<div>Commit</div>, className:'bg-green-700 border-green-800 text-white hover:bg-green-800'}]}>
        {modalItem && modalItem.description && 
        <Form>
            <Form.Field label={modalItem.description + ' (max ' + (modalItem.quantity - modalItem.committed) + ')'}>
            <Form.Number name={'commitQuantity'} friendlyName={modalItem.description} value={commitQuantity} onChange={(e) => {setCommitQuantity(parseInt(e.target.value))}} min={1} max={modalItem.quantity - modalItem.committed} />
            </Form.Field> 
        </Form>
        }
        </Modal>
  </div>
  )
}

export default WishlistItems