<a name="ImageUtils"></a>

## ImageUtils
**Kind**: global class  
**Npmpackage**:   

* [ImageUtils](#ImageUtils)
    * [new ImageUtils()](#new_ImageUtils_new)
    * [.fitImageAtCoordinate(target, originX, originY, source)](#ImageUtils.fitImageAtCoordinate)

<a name="new_ImageUtils_new"></a>

### new ImageUtils()
This object contains methods necessary for manipulating images.<br>
Import from <a href="https://github.com/ff0000-ad-tech/ad-utils">ad-utils</a>
<br>
<pre class="sunlight-highlight-javascript">
import { ImageUtils } from 'ad-utils'
</pre>

<a name="ImageUtils.fitImageAtCoordinate"></a>

### ImageUtils.fitImageAtCoordinate(target, originX, originY, source)
Positions a background image to fit the div size while centering around a point.  If the point is beyond the size bounds, it will align to that side.

**Kind**: static method of [<code>ImageUtils</code>](#ImageUtils)  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>element</code> | The div with a background image |
| originX | <code>number</code> | The x position to center on |
| originY | <code>number</code> | The y position to center on |
| source | <code>img</code> | Optional pass in a source img tag to skip the need to load to get source data |

