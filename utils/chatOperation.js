import { usersCollection } from "@firebase/firebase"
import { useCollection } from "react-firebase-hooks/firestore"

const getParticipantEmails = (signedInUser, participants) => {
    return participants?.filter(email => email !== signedInUser?.email)[0]
}

const getParticipantDetails = (signedInUser, participants) => {
    const participantEmail = getParticipantEmails(signedInUser, participants)
    const [participantSnapshot] = useCollection(usersCollection.where('email', '==', participantEmail))
    return participantSnapshot?.docs.[0]?.data()
}

export {getParticipantEmails, getParticipantDetails}

