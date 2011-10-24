/*
   Copyright (c) 2007 Danny Chapman
   http://www.rowlhouse.co.uk

   This software is provided 'as-is', without any express or implied
   warranty. In no event will the authors be held liable for any damages
   arising from the use of this software.
   Permission is granted to anyone to use this software for any purpose,
   including commercial applications, and to alter it and redistribute it
   freely, subject to the following restrictions:
   1. The origin of this software must not be misrepresented; you must not
   claim that you wrote the original software. If you use this software
   in a product, an acknowledgment in the product documentation would be
   appreciated but is not required.
   2. Altered source versions must be plainly marked as such, and must not be
   misrepresented as being the original software.
   3. This notice may not be removed or altered from any source
   distribution.
 */

(function(jigLib){
	/**
	 * @author Muzer(muzerly@gmail.com)
	 * 
	 * @name CollPointInfo
	 * @class CollPointInfo
	 * @property {number} initialPenetration
	 * @property {array} r0 a 3D vector
	 * @property {array} r1 a 3D vector
	 * @property {array} position a 3D vector
	 * @property {number} minSeparationVel
	 * @property {number} denominator
	 * @property {number} accumulatedNormalImpulse
	 * @property {number} accumulatedNormalImpulseAux
	 * @property {array} accumulatedFrictionImpulse a 3D vector
	 * @constructor
	 **/
	var CollPointInfo=function(){
		this.accumulatedFrictionImpulse=[0,0,0,0];
	};
	
	CollPointInfo.prototype.initialPenetration=null;
	CollPointInfo.prototype.r0;
	CollPointInfo.prototype.r1;
	CollPointInfo.prototype.position;

	CollPointInfo.prototype.minSeparationVel = 0;
	CollPointInfo.prototype.denominator = 0;

	CollPointInfo.prototype.accumulatedNormalImpulse = 0;
	CollPointInfo.prototype.accumulatedNormalImpulseAux = 0;
	CollPointInfo.prototype.accumulatedFrictionImpulse = null;
	
	jigLib.CollPointInfo=CollPointInfo;
})(jigLib);