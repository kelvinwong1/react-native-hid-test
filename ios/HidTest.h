#ifdef RCT_NEW_ARCH_ENABLED
#import "RNHidTestSpec.h"

@interface HidTest : NSObject <NativeHidTestSpec>
#else
#import <React/RCTBridgeModule.h>

@interface HidTest : NSObject <RCTBridgeModule>
#endif

@end
