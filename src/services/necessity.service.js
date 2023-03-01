import { where } from 'firebase/firestore';

import dataService from './data.service';

const collection = 'necessities';


class NecessityService {

    addCommitment = async (id, user, quantity, displayName, username) => {
        try {
            let necessitySnap = await this.get(id);
            let necessity = necessitySnap.data();
    
            // Make sure this present does not already have a commitment
            if (necessity.committed && necessity.committed >= necessity.quantity) return {success:false, message:'All commitments have already been made for this item!'};

            let commitments = necessity.commitments ? necessity.commitments : [];
    
            // Check if this user has already comitted to this necessity.

            let existingCommitmentSnap = await dataService.all('commitments',  [where('to','==',necessitySnap.ref), where('user','==',user.uid)]);
            if (existingCommitmentSnap.docs.length === 1) {
                // A commitment exists. Update the quantity
                let existingCommitment = existingCommitmentSnap.docs[0];
                let existingQuantity = 0;
                if (existingCommitment.data().details && existingCommitment.data().details.quantity) existingQuantity = existingCommitment.data().details.quantity;
                await dataService.update('commitments', existingCommitment.id, {details: {quantity: existingQuantity + quantity}});
            }
            else {
                // Create a new commitment
                let newCommitment = await dataService.add('commitments', {by: displayName + " <" + username + ">",user: user.uid, description: necessity.description, details: {quantity}, to: necessitySnap.ref});                
                commitments.push(newCommitment)                
            }

            let committed = necessity.committed ? necessity.committed : 0;
            committed += quantity;

            // Update the present with the new commitment info
            await this.update(id, {commitments, committed} );
    
            return {success:true, message:'Your commitment has been saved. Thank you for your support!'};
        }
        catch (ex) {
            return {success:false, message:'Your commitment could not be saved: ' + ex.message};
        }
    }

    add = (newPresent) => {
        return dataService.add(collection, newPresent);
    }

    update = (id, updatedPresent) => {
        return dataService.update(collection, id, updatedPresent);
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

export default new NecessityService();