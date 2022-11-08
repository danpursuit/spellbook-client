import dagger from '../../../images/weapons/dagger.png';
import sword from '../../../images/weapons/sword.png';
import hellslicer from '../../../images/weapons/hellslicer.png';
import blacksmiths from '../../../images/gloves/blacksmiths.png';
import mystical from '../../../images/gloves/mystical.png';
import eternalFlame from '../../../images/auxiliary/eternalFlame.png';
import goldPendant from '../../../images/auxiliary/goldPendant.png';
import steelChestplate from '../../../images/armor/steelChestplate.png';
import magmaticBarbs from '../../../images/armor/magmaticBarbs.png';
import ceremonialGarb from '../../../images/armor/ceremonialGarb.png';
export const frameWidth = 50;
export const equipWidth = 40;
const shifted = (frameWidth - equipWidth) / 2;

const shift2 = {
    width: `45px`,
    height: `45px`,
    transform: `translateX(2.5px) translateY(2.5px)`,
}

export default {
    default: {
        width: `${equipWidth}px`,
        height: `${equipWidth}px`,
        backgroundSize: 'contain',
        transform: `translateX(${shifted}px) translateY(${shifted}px)`,
    },
    float: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: `inherit`,
        height: `inherit`,
        boxSizing: 'border-box',
    },
    dagger: {
        backgroundImage: `url(${dagger})`,
    },
    sword: {
        backgroundImage: `url(${sword})`,
    },
    hellslicer: {
        backgroundImage: `url(${hellslicer})`,
        ...shift2
    },
    blacksmiths: {
        backgroundImage: `url(${blacksmiths})`,
    },
    mystical: {
        backgroundImage: `url(${mystical})`,
        ...shift2
    },
    eternalFlame: {
        backgroundImage: `url(${eternalFlame})`,
    },
    goldPendant: {
        backgroundImage: `url(${goldPendant})`,
    },
    steelChestplate: {
        backgroundImage: `url(${steelChestplate})`,
    },
    ceremonialGarb: {
        backgroundImage: `url(${ceremonialGarb})`,
        ...shift2
    },
    magmaticBarbs: {
        backgroundImage: `url(${magmaticBarbs})`,
        width: `45px`,
        height: `45px`,
        transform: `translateX(2.5px) translateY(0px)`,
    },
    fireFrame: {
        border: '4px solid #ff0000d0',
        borderStyle: 'inset',
    },
    shadowFrame: {
        border: '4px solid #720074d0',
    },
}