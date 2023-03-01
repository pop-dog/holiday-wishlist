import dataService from './data.service';

const collection = 'presents';

class PresentService {

    addCommitment = async (id, user, displayName, username, forName) => {
        let presentSnap = await this.get(id);
        let present = presentSnap.data();

        // Make sure this present does not already have a commitment
        if (present.commitment) return {success:false, message:'A commitment has already been made for this present!'};

        // Create a new commitment
        let newCommitment = await dataService.add('commitments', {by: displayName + " <" + username + ">", user:user.uid, description: present.description, for:forName, details: {age:parseInt(present.age), gender:present.gender}, to: presentSnap.ref});

        // Update the present with the new commitment info
        return dataService.update(collection, id, {commitment:newCommitment, commitmentBy:displayName + ' <' + username + '>'} );
    }

    add = (newPresent) => {
        return dataService.add(collection, newPresent);
    }

    update = async (id, updatedPresent) => {
        let presentDoc = await this.get(id);
        let present = presentDoc.data();
        if (present.commitment) {
            await dataService.update('commitments', present.commitment.id, {for:updatedPresent.for});
        }
        return dataService.update(collection, id, updatedPresent);
    }

    safeDelete = async (id) => {
        let presentSnap = await this.get(id);
        let present = presentSnap.data();

        if (present.commitment) await dataService.delete('commitments', present.commitment.id);
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

export default new PresentService();