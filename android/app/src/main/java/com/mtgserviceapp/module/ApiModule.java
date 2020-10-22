package com.mtgserviceapp.module;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import javax.annotation.Nonnull;

public class  ApiModule extends ReactContextBaseJavaModule{
    private ReactApplicationContext mContext;
    public ApiModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    @Nonnull
    @Override
    public String getName() {
        //这个名字在 JavaScript 端标记这个模块
        return "ApiModule";
    }
}