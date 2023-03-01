import dataService from './data.service';

const collection = 'trees';

class TreeService {

    addCommitment = async (id, user, displayName, username) => {
        try {
            let treeSnap = await this.get(id);
            let tree = treeSnap.data();
    
            // Make sure this tree does not already have a commitment
            if (tree.commitment) return {success:false, message:'A commitment has already been made for this tree!'};
    
            // Create a new commitment
            let newCommitment = await dataService.add('commitments', {by: displayName + " <" + username + ">", user:user.uid, details: {}, to: treeSnap.ref});

            // Update the tree with the new commitment info
            await this.update(id, {commitment:newCommitment, commitmentBy:displayName + ' <' + username + '>'} );
    
            return {success:true, message:'Your commitment has been saved. Thank you for your support!'};
        }
        catch (ex) {
            return {success:false, message:'Your commitment could not be saved: ' + ex.message};
        }
    }

    add = (newTree) => {
        return dataService.add(collection, newTree);
    }

    update = (id, updatedTree) => {
        return dataService.update(collection, id, updatedTree);
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

export default new TreeService();