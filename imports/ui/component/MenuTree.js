import React from 'react';
import { Session } from 'meteor/session';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import CheckboxTree from 'react-checkbox-tree';
import { mainModules } from '/imports/fixture/menu';

class MenuTree extends React.Component {
    constructor(props) {
        super(props);

        this.onCheck = this.onCheck.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onExpand = this.onExpand.bind(this);

        this.state = {
            clicked: {},
        };
    }

    onCheck(checked) {
        Session.set('grantedMenuIDs', checked);
    }

    onClick(clicked) {
        this.setState({ clicked });
    }

    onExpand(expanded) {
        Session.set('expandedMenuIDs', expanded);
    }

    render() {
        return (
            <div className="clickable-labels">
                <CheckboxTree
                    checked={this.props.grantedMenuIDs}
                    expanded={this.props.expandedMenuIDs}
                    iconsClass="fa5"
                    nodes={this.props.nodes}
                    expandOnClick
                    onCheck={this.onCheck}
                    onClick={this.onClick}
                    onExpand={this.onExpand}
                    showExpandAll={true}
                />
            </div>
        );
    }
}

MenuTree.propTypes = {
    grantedMenuIDs: PropTypes.array,
    expandedMenuIDs: PropTypes.array,
    nodes: PropTypes.array.isRequired,
};

export default withTracker(() => {
    const nodes = [];
    //第一層方框
    mainModules.forEach((module) => {
        const { _id, name, menu } = module;
        const node = { value: _id, label: name };
        const children = [];
        // 第二層選項
        menu.forEach((m) => {
            const subMenu = [];
            if (m.subMenu) {
                m.subMenu.forEach((s) => {
                    // 寫第一/二/三層
                    subMenu.push({
                        value: `${_id}-${m._id}-${s._id}`,
                        label: s.name,
                    });
                });

                //寫一/二層
                children.push({
                    value: `${_id}-${m._id}`,
                    label: m.name,
                    children: subMenu,
                });
            } else {
                //寫一/二層
                children.push({
                    value: `${_id}-${m._id}`,
                    label: m.name,
                });
            }
        });
        if (children !== []) {
            node.children = children;
        }
        nodes.push(node);
    });
    const grantedMenuIDs = Session.get('grantedMenuIDs');
    const expandedMenuIDs = Session.get('expandedMenuIDs');
    return {
        grantedMenuIDs,
        expandedMenuIDs,
        nodes,
    };
})(MenuTree);
