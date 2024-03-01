import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import classes from './StatWithToolTip.module.css'

function StatWithToolTip({children, title, body}) {
    return (
        <OverlayTrigger
            placement='right'
            overlay={
                <Popover id={`popover-positioned-'right'`} className={classes.popover}>
                    <Popover.Header as="h3" className={classes.popoverHeader}>{title}</Popover.Header>
                    <Popover.Body className={classes.popoverBody}>{body}</Popover.Body>
                </Popover>
            }
        >
            {children}
        </OverlayTrigger>
    );
}

export default StatWithToolTip;