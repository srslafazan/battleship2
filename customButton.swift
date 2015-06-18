//
//  customButton.swift
//  iosProject
//
//  Created by Paula Chojnacki on 6/18/15.
//  Copyright (c) 2015 Shain Lafazan. All rights reserved.
//

import Foundation
import UIKit

class customButton: UIButton {
    required init(coder aDecoder: NSCoder) {
        super.init(coder: aDecoder)
        self.layer.borderWidth = 1
        self.layer.borderColor = UIColor.whiteColor().CGColor
    }
}