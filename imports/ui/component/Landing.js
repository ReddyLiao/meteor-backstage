import React from 'react';
import { useHistory } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { mainModules } from '/imports/fixture/menu';
import { useTracker } from 'meteor/react-meteor-data';
import {
    CalendarIcon,
    ChartBarIcon,
    FolderIcon,
    HomeIcon,
    InboxIcon,
    MenuIcon,
    UsersIcon,
    XIcon,
} from '@heroicons/react/outline';

const Landing = () => {
    const user = useTracker(() => Meteor.user());
    const history = useHistory();
    const showModules = [];
    // 每6個模組秀一排
    for (let x = 0; x < mainModules.length / 6; x++) {
        const subModules = [];
        for (let y = 0; y < 6; y++) {
            if (x * 6 + y < mainModules.length) {
                subModules.push(mainModules[x * 6 + y]);
            }
        }
        showModules.push(subModules);
    }

    return (
        <div>
            <section className="hero is-info is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns">
                            <div className="column">
                                {showModules.map((module, index) => (
                                    <div key={index} className="tile is-ancestor">
                                        {showModules[index].map((m) => {
                                            const { _id, header, name, url } = m;
                                            if (user) {
                                                return (
                                                    <a
                                                        key={_id}
                                                        className="tile is-2 is-parent is-narrow"
                                                        url={url}
                                                        onClick={() => history.push(url)}
                                                    >
                                                        <article className="tile is-child box has-text-centered">
                                                            <p className="title has-text-primary">{header}</p>
                                                            <p className="subtitle has-text-primary">{name}</p>
                                                        </article>
                                                    </a>
                                                );
                                            }
                                            return undefined;
                                        })}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;
