import './ResetNotesBtn.css'
import { motion } from "framer-motion"
import { memo } from 'react'

function ResetNotesBtn() {
    const ResetNotesBtnClick = () => {
        localStorage.clear();
        location.reload();
    }
       return (
        <motion.button 
            className="ResetNotesBtn"
            onClick={ResetNotesBtnClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            Reset Notes
        </motion.button>
    )
}

export default memo(ResetNotesBtn)