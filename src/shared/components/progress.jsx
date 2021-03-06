import React from "react";
import {observer} from "mobx-react";

/**
 * Progress bar
 * @param  {number} progressPct Percentage to display
 * @return {string}             HTML progress bar
 */
export default observer(({percentage}) => (
  <progress max="100"
    value={percentage}
    className="progress is-primary"
  >
    <div className="progress is-primary">
      <span style={{width: percentage}}>{percentage}%</span>
    </div>
  </progress>
));
