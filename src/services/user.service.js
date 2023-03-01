import { where } from "firebase/firestore";
import dataService from "./data.service";

const collection = 'users';

class UserService {

    addWithId = async (newUser, id) => {
        if (id) {
            let existingUserDoc = await this.get(id);
            if (!existingUserDoc.data()) {
                await dataService.addWithId(collection, newUser, id);
                return true;
            }
            else return false;
        }
        else {
            await this.add(newUser);
            return true;
        } 
    }

    add = async (newUser) => {
        return dataService.add(collection, newUser);
    }

    update = async (id, updatedUser) => {
        return dataService.update(collection, id, updatedUser);
    }

    updateDisplayName = async (id, newDisplayName) => {
        try {
            let existingUserDoc = await this.get(id);
            let userData = existingUserDoc.data();
            if (userData) {
                // Check if the display name has changed
                if (userData.displayName == newDisplayName) return ''; // No need to update. Return

                // First, update the user record
                await this.update(id, {displayName:newDisplayName});

                // Next, check if there are any commitments to update
                let commitments = await (await dataService.all('commitments', where('user','==', id))).docs;
                for (let i = 0; i < commitments.length; i++) {
                    let commitmentDoc = commitments[i];
                    let fullUsername = newDisplayName + ' <' + userData.username + '>';
                    await dataService.update('commitments', commitmentDoc.id, {by:fullUsername});
                    let gift = commitmentDoc.data().to;
                    let giftType = gift.path.split('/')[0];
                    if (giftType == 'presents') await dataService.update('presents', gift.id, {commitmentBy:fullUsername})
                }
                return '';
            }
            else return "Could not find user.";
        }
        catch (ex) {
            return "There was an error!";
        }

    };

    delete = async (id) => {
        return dataService.delete(collection, id);
    }

    all = async (whereClause) => {
        return dataService.all(collection, whereClause);
    }

    get = async (id) => {
        return dataService.get(collection, id);
    }
}

export default new UserService();