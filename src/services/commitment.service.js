import dataService from './data.service';

const collection = 'commitments';

class CommitmentService {

    removePresentCommitment = async (commitment, presentRef) => {
        await this.delete(commitment.id);
        return dataService.update('presents', presentRef.id, {commitment:null, commitmentBy:''});
    }

    removeNecessityCommitment = async (commitment, necessityRef) => {
        let necessityDoc = await dataService.getByRef(necessityRef);
        let necessityData = necessityDoc.data();
        
        // Find the new number that is comitted
        let commitQuantity = commitment.details.quantity;
        let newQuantity = necessityData.committed - commitQuantity;

        let commitments = necessityData.commitments.filter(c => c.id != commitment.id);

        // Set the new number committed
        await dataService.update('necessities', necessityRef.id, {commitments, committed:newQuantity});

        // Delete the commitment
        return this.delete(commitment.id);
    }

    removeWishlistItemCommitment = async (commitment, necessityRef) => {
        let wishlistItemDoc = await dataService.getByRef(necessityRef);
        let wishlistItemData = wishlistItemDoc.data();
        
        // Find the new number that is comitted
        let commitQuantity = commitment.details.quantity;
        let newQuantity = wishlistItemData.committed - commitQuantity;

        let commitments = wishlistItemData.commitments.filter(c => c.id != commitment.id);

        // Set the new number committed
        await dataService.update('wishlistItems', necessityRef.id, {commitments, committed:newQuantity});

        // Delete the commitment
        return this.delete(commitment.id);
    }

    markReceived = async (commitment) => {
        await this.update(commitment.id, {received:true});
    }

    markNotReceived = async (commitment) => {
        await this.update(commitment.id, {received:false});
    }

    add = (newCommitment) => {
        return dataService.add(collection, newCommitment);
    }

    update = (id, updatedCommitment) => {
        return dataService.update(collection, id, updatedCommitment);
    }

    safeDelete = async (commitment) => {
        if (commitment.to.path.split('/')[0] == 'presents') return this.removePresentCommitment(commitment, commitment.to);
        else if (commitment.to.path.split('/')[0] == 'wishlistItems') return this.removeWishlistItemCommitment(commitment, commitment.to);
        else return this.delete(commitment.id);
    }

    delete = (id) => {
        return dataService.delete(collection, id);
    }

    all = (whereClause) => {
        return dataService.all(collection, whereClause)        
    }

    get = (id) => {
        return dataService.get(collection, id);
    }
}

export default new CommitmentService();