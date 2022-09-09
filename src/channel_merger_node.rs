// ---------------------------------------------------------- //
// ---------------------------------------------------------- //
//    - WARNING - DO NOT EDIT                               - //
//    - This file has been generated                        - //
// ---------------------------------------------------------- //
// ---------------------------------------------------------- //

use crate::*;
use napi::*;
use napi_derive::js_function;
use std::rc::Rc;
use web_audio_api::node::*;

pub(crate) struct NapiChannelMergerNode(Rc<ChannelMergerNode>);

impl NapiChannelMergerNode {
    pub fn create_js_class(env: &Env) -> Result<JsFunction> {
        env.define_class(
            "ChannelMergerNode",
            constructor,
            &[
                // Attributes

                // Methods

                // AudioNode interface
                Property::new("connect")?
                    .with_method(connect)
                    .with_property_attributes(PropertyAttributes::Enumerable),
                // Property::new("disconnect")?.with_method(disconnect),
            ],
        )
    }

    pub fn unwrap(&self) -> &ChannelMergerNode {
        &self.0
    }
}

#[js_function(1)]
fn constructor(ctx: CallContext) -> Result<JsUndefined> {
    let mut js_this = ctx.this_unchecked::<JsObject>();

    let js_audio_context = ctx.get::<JsObject>(0)?;
    let napi_audio_context = ctx.env.unwrap::<NapiAudioContext>(&js_audio_context)?;
    let audio_context = napi_audio_context.unwrap();

    js_this.define_properties(&[
        Property::new("context")?
            .with_value(&js_audio_context)
            .with_property_attributes(PropertyAttributes::Enumerable),
        // this must be put on the instance and not in the prototype to be reachable
        Property::new("Symbol.toStringTag")?
            .with_value(&ctx.env.create_string("ChannelMergerNode")?)
            .with_property_attributes(PropertyAttributes::Static),
    ])?;

    let native_node = Rc::new(ChannelMergerNode::new(audio_context, Default::default()));

    // finalize instance creation
    let napi_node = NapiChannelMergerNode(native_node);
    ctx.env.wrap(&mut js_this, napi_node)?;

    ctx.env.get_undefined()
}

// -------------------------------------------------
// AudioNode Interface
// -------------------------------------------------
connect_method!(NapiChannelMergerNode);
// disconnect_method!(NapiChannelMergerNode);

// -------------------------------------------------
// GETTERS
// -------------------------------------------------

// -------------------------------------------------
// SETTERS
// -------------------------------------------------

// -------------------------------------------------
// METHODS
// -------------------------------------------------