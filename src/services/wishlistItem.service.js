import { where } from 'firebase/firestore';

import dataService from './data.service';

const collection = 'wishlistItems';


class WishlistItemService {

    addCommitment = async (id, user, quantity, displayName, username, forName) => {
        let wishlistItemSnap = await this.get(id);
        let wishlistItem = wishlistItemSnap.data();

        // Make sure this wishlistItem does not already have a commitment
        if (wishlistItem.committed && wishlistItem.committed >= wishlistItem.quantity) return {success:false, message:'All commitments have already been made for this item!'};


        let commitments = wishlistItem.commitments ? wishlistItem.commitments : [];

        // Check if this user has already comitted to this wishlistItem.

        let existingCommitmentSnap = await dataService.all('commitments',  [where('to','==',wishlistItemSnap.ref), where('user','==',user.uid)]);
        if (existingCommitmentSnap.docs.length === 1) {
            // A commitment exists. Update the quantity
            let existingCommitment = existingCommitmentSnap.docs[0];
            let existingQuantity = 0;
            if (existingCommitment.data().details && existingCommitment.data().details.quantity) existingQuantity = existingCommitment.data().details.quantity;
            await dataService.update('commitments', existingCommitment.id, {details: {quantity: existingQuantity + quantity}, for:forName});
        }
        else {
            let newCommitData = {by: displayName + " <" + username + ">",user: user.uid, description: wishlistItem.description, details: {quantity}, to: wishlistItemSnap.ref, for:forName};
            // Create a new commitment
            let newCommitment = await dataService.add('commitments', {by: displayName + " <" + username + ">",user: user.uid, description: wishlistItem.description, details: {quantity}, to: wishlistItemSnap.ref, for:forName});                
            commitments.push(newCommitment)                
        }

        let committed = wishlistItem.committed ? wishlistItem.committed : 0;
        committed += quantity;

        // Update the wishlistItem with the new commitment info
        return dataService.update(collection, id, {commitments, committed} );
    }

    add = (newWishlistItem) => {
        return dataService.add(collection, newWishlistItem);
    }

    update = async (id, updatedWishlistItem) => {
        let wishlistItemDoc = await this.get(id);
        let wishlistItem = wishlistItemDoc.data();
        for (let i = 0; i < wishlistItem.commitments.length; i++) {
            await dataService.update('commitments', wishlistItem.commitments[i].id, {for:updatedWishlistItem.for});
        }
        return dataService.update(collection, id, updatedWishlistItem);
    }

    deleteSafe = async (id) => {
        let wishlistItemSnap = await this.get(id);
        let wishlistItem = wishlistItemSnap.data();

        for (let i = 0; i < wishlistItem.commitments.length; i++) {
            await dataService.delete('commitments', wishlistItem.commitments[i].id);
        }
        return this.delete(id);
    }

    delete = async (id) => {
        return dataService.delete(collection, id);
    }

    all = (whereClause) => {
        return dataService.all(collection, whereClause);
    }

    get = (id) => {
        return dataService.get(collection, id);
    }
}

export default new WishlistItemService();